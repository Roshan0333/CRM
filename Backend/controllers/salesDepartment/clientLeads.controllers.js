import Exceljs from "exceljs";
import mongoose, { Types } from "mongoose"
import fs from "fs";
import fsp from "fs/promises";
import fastcsv from "fast-csv";
import SalesTeam_Model from "../../models/salesDepartment/salesTeams.models.js";
import UserModel from "../../models/User.js";

const excelFile = async (req, res) => {
    try {

        const { _id } = req.user;

        if (!req.file) {
            return res.status(400).json({ msg: "Please Send File." })
        }
        const db = mongoose.connection.db;
        const clientLeadsCollection = db.collection("clientLead");

        let leadFile = req.file.path;
        await clientLeadsCollection.deleteMany({
            managerId: _id
        });

        await clientLeadsCollection.createIndexes([
            { key: { managerId: 1 } },
            { key: { status: 1 } },
            { key: { assignedTo: 1 } },
            { key: { createdAt: -1 } },
            { key: { status: 1, assignedTo: 1 } },
            { key: { managerId: 1, status: 1, assignedTo: 1 } }
        ]);

        const workbook = new Exceljs.stream.xlsx.WorkbookReader(leadFile);

        const Batch_Size = 1000;
        let batch = [];
        let totalInserted = 0;
        let headers = [];

        for await (const worksheet of workbook) {
            for await (const row of worksheet) {
                if (row.number === 1) {
                    headers = row.values
                        .slice(1)
                        .map(header => header?.toString().trim().toLowerCase().replace(/\s+/g, "_")
                        );

                    continue;
                }

                const rowData = {};

                row.values.slice(1).forEach((cell, index) => {
                    const key = headers[index];

                    let value = cell?.text ?? cell;

                    const num = Number(value);
                    value = Number.isNaN(num) ? value : num;

                    rowData[key] = value ?? null;
                });

                batch.push({
                    ...rowData,
                    managerId: _id,
                    reminderDate: null,
                    lastUpdateDate: null,
                    clientStatus: null,
                    comment: [],
                    teamStatus: "UNASSIGNED",
                    status: "UNASSIGNED",
                    teamId: null,
                    assignedTo: null,
                    assignedAt: null,
                    createdAt: new Date()
                });

                if (batch.length === Batch_Size) {
                    await clientLeadsCollection.insertMany(batch, {
                        ordered: false,
                    });

                    totalInserted += batch.length;
                    batch = []
                }
            }
        }

        if (batch.length) {
            await clientLeadsCollection.insertMany(batch, { ordered: false });
            totalInserted += batch.length;
        }

        await fsp.unlink(leadFile);

        return res.status(200).json({ msg: "Data Insert Successfully" });

    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const csvFile = async (req, res) => {
    try {

        const { _id } = req.user;

        if (!req.file) {
            return res.status(400).json({ msg: "Please Send File" });
        }

        let leadFile = req.file.path;

        const db = mongoose.connection.db;
        const clientLeadsCollection = db.collection("clientLead");

        await clientLeadsCollection.deleteMany({
            managerId: _id
        });

        await clientLeadsCollection.createIndexes([
            { key: { managerId: 1 } },
            { key: { status: 1 } },
            { key: { assignedTo: 1 } },
            { key: { createdAt: -1 } },
            { key: { status: 1, assignedTo: 1 } },
            { key: { managerId: 1, status: 1, assignedTo: 1 } }
        ]);

        const Batch_Size = 1000;
        let batch = [];
        let insertedCount = 0
        let streamDestroyed = false;

        const stream = fs.createReadStream(leadFile).pipe(fastcsv.parse({ headers: true }));

        stream.on("data", async (row) => {
            stream.pause();

            const doc = {
                ...row,
                managerId: _id,
                reminderDate: null,
                lastUpdateDate: null,
                clientStatus: null,
                comment: [],
                teamStatus: "UNASSIGNED",
                status: "UNASSIGNED",
                teamId: null,
                assignedTo: null,
                assignedAt: null,
                createdAt: new Date(),
            };

            try {
                batch.push({
                    insertOne: { document: doc }
                });

                if (batch.length >= Batch_Size) {
                    await clientLeadsCollection.bulkWrite(batch, {
                        ordered: false,
                    });

                    insertedCount += batch.length;
                    batch = [];
                }
            }
            catch (err) {
                console.error("Batch Error:", err.message);
                stream.destroy();
                streamDestroyed = true;

                await fsp.unlink(leadFile);

                return res.status(500).json({
                    success: false,
                    msg: "Error inserting batch",
                });
            }

            stream.resume();
        });

        stream.on("end", async () => {
            try {
                if (!streamDestroyed && batch.length > 0) {
                    await clientLeadsCollection.bulkWrite(batch, {
                        ordered: false,
                    });

                    insertedCount += batch.length;
                }

                await fsp.unlink(leadFile);

                return res.status(200).json({
                    success: true,
                    msg: "Data Insert Successfully"
                });
            }
            catch (err) {
                console.error("Error:", err.message);
                return res.status(500).json({
                    success: false,
                    msg: "Final batch insert failed",
                });
            }
        })

        stream.on("error", async (err) => {
            console.error("Stream Error", err.message);

            await fsp.unlink(leadFile);

            return res.status(500).json({
                success: false,
                msg: "CSV parsing failed",
            });
        })

    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const teamAssignLeads = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const managerId = new mongoose.Types.ObjectId(req.user._id);
        const { distributionList } = req.body;

        if (!Array.isArray(distributionList) || distributionList.length === 0) {
            return res.status(400).json({
                msg: "distributionList must be a non-empty array"
            });
        }

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");
        const teamCollection = db.collection("salesteams");

        const CHUNK_SIZE = 1000;
        const report = [];

        const emails = distributionList
            .filter(i => i.employeeEmail)
            .map(i => i.employeeEmail);

        const teamLeaders = await teamCollection.find(
            { TLEmail_Id: { $in: emails } },
            { projection: { _id: 1, TLEmail_Id: 1 } }
        ).toArray();

        const teamLeaderMap = new Map(
            teamLeaders.map(tl => [tl.TLEmail_Id, tl._id])
        );

        for (const item of distributionList) {
            const { employeeEmail, leadCount } = item;

            if (!employeeEmail || !leadCount || leadCount <= 0) continue;

            const teamId = teamLeaderMap.get(employeeEmail);

            if (!teamId) {
                report.push({
                    teamLeaderEmail: employeeEmail,
                    assigned: 0,
                    remaining: leadCount,
                    error: "Team leader not found"
                });
                continue;
            }

            let remaining = leadCount;
            let assigned = 0;

            while (remaining > 0) {
                const leads = await clientLeadCollection.find(
                    {
                        managerId,
                        teamStatus: "UNASSIGNED"
                    },
                    { projection: { _id: 1 } }
                )
                    .sort({ _id: 1 })
                    .limit(Math.min(CHUNK_SIZE, remaining))
                    .toArray();

                if (leads.length === 0) break;

                const leadIds = leads.map(l => l._id);

                const result = await clientLeadCollection.updateMany(
                    {
                        _id: { $in: leadIds },
                        teamStatus: "UNASSIGNED"
                    },
                    {
                        $set: {
                            teamStatus: "ASSIGNED",
                            teamId,
                            assignedAt: new Date()
                        }
                    }
                );

                assigned += result.modifiedCount;
                remaining -= result.modifiedCount;
            }

            report.push({
                teamLeaderEmail: employeeEmail,
                assigned,
                remaining
            });
        }

        return res.status(200).json({
            msg: "Lead distribution completed",
            report
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error.message
        });
    }
};


const assignLeadsByTeamLead = async (req, res) => {
    try {
        const { distributionList } = req.body;
        const { _id } = req.user;

        const teamDetails = await SalesTeam_Model.findOne({ TLId: _id });
        const teamId = teamDetails._id;

        if (!Array.isArray(distributionList) || distributionList.length === 0) {
            return res.status(400).json({ msg: "DistributionList must be a non-empty array" })
        }

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");
        const employeeCollection = db.collection("users");


        const Chunk_Size = 1000;
        const report = [];

        const validateList = distributionList
            .filter(item => item.employeeEmail);

        const employeeEmails = validateList.map(item => item.employeeEmail);

        const employees = await employeeCollection.find(
            { email: { $in: employeeEmails } },
            { projection: { _id: 1, email: 1 } }
        ).toArray();

        const employeeList = new Map(
            employees.map(emp => [emp.email, emp._id])
        );

        for (const item of distributionList) {

            const { employeeEmail, leadCount } = item;

            if (!employeeEmail || leadCount <= 0) continue;

            const employeeId = employeeList.get(employeeEmail);

            if (!employeeId) {
                report.push({
                    userEmail: item.employeeEmail,
                    assigned: 0,
                    error: "Employeee not found"
                });
                continue;
            }

            let remaining = leadCount;
            let assigned = 0;

            while (remaining > 0) {
                const leads = await clientLeadCollection.find({
                    teamId: teamId,
                    status: "UNASSIGNED"
                })
                    .sort({ createdAt: -1 })
                    .limit(Math.min(Chunk_Size, remaining))
                    .project({ _id: 1 })
                    .toArray();

                if (leads.length === 0) break;

                const ids = leads.map(item => item._id);

                const result = await clientLeadCollection.updateMany(
                    {
                        _id: { $in: ids },
                        status: "UNASSIGNED",
                        teamId: teamId,
                    },
                    {
                        $set: {
                            status: "ASSIGNED",
                            assignedTo: employeeId,
                            assignedAt: new Date()
                        }
                    }
                );

                assigned += result.modifiedCount;
                remaining -= result.modifiedCount;
            }

        }

        return res.status(200).json({ msg: "Successful", report });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const assignLeadsByManager = async (req, res) => {
    try {
        const { distributionList } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const managerId = new mongoose.Types.ObjectId(req.user._id);

        if (!Array.isArray(distributionList) || distributionList.length === 0) {
            return res.status(400).json({
                msg: "DistributionList must be a non-empty array"
            });
        }

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");
        const employeeCollection = db.collection("users");

        const CHUNK_SIZE = 1000;
        const report = [];

        const employeeEmails = distributionList
            .filter(i => i.employeeEmail)
            .map(i => i.employeeEmail.trim().toLowerCase());

        const employees = await employeeCollection.find(
            { email: { $in: employeeEmails } },
            { projection: { _id: 1, email: 1 } }
        ).toArray();

        const employeeMap = new Map(
            employees.map(e => [e.email.toLowerCase(), e._id])
        );

        for (const item of distributionList) {
            const { employeeEmail, leadCount } = item;
            if (!employeeEmail || leadCount <= 0) continue;

            const email = employeeEmail.trim().toLowerCase();
            const employeeId = employeeMap.get(email);

            if (!employeeId) {
                report.push({
                    userEmail: employeeEmail,
                    assigned: 0,
                    error: "Employee not found"
                });
                continue;
            }

            let assigned = 0;
            let remaining = leadCount;

            while (remaining > 0) {
                const leads = await clientLeadCollection.find(
                    {
                        managerId,
                        teamStatus: "UNASSIGNED",
                        status: "UNASSIGNED"
                    },
                    { projection: { _id: 1 } }
                )
                    .sort({ _id: 1 })
                    .limit(Math.min(CHUNK_SIZE, remaining))
                    .toArray();

                if (leads.length === 0) break;

                const ids = leads.map(l => l._id);

                const result = await clientLeadCollection.updateMany(
                    {
                        _id: { $in: ids },
                        managerId,
                        teamStatus: "UNASSIGNED",
                        status: "UNASSIGNED"
                    },
                    {
                        $set: {
                            teamStatus: "ASSIGNED",
                            status: "ASSIGNED",
                            assignedTo: employeeId,
                            assignedAt: new Date()
                        }
                    }
                );

                assigned += result.modifiedCount;
                remaining -= result.modifiedCount;
            }

            report.push({
                userEmail: employeeEmail,
                requested: leadCount,
                assigned,
                remaining
            });
        }

        return res.status(200).json({
            msg: "Leads assigned successfully",
            report
        });

    } catch (err) {
        console.error("Lead Assignment Error:", err);
        return res.status(500).json({
            msg: "Internal Server Error",
            error: err.message
        });
    }
};

const getAssignedLeadList = async (req, res) => {
    try {
        const { _id } = req.user;

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");

        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const lastId = req.query.lastId;

        let query = {
            assignedTo: _id,
            status: "ASSIGNED",
            clientStatus: null
        };

        if (lastId) {
            query._id = { $gt: new mongoose.Types.ObjectId(lastId) };
        }

        const leadList = await clientLeadCollection
            .find(query)
            .sort({ _id: 1 })
            .limit(limit)
            .toArray()

        return res.status(200).json({
            clientList: leadList,
            nextCursor: leadList.length
                ? leadList[leadList.length - 1]._id
                : null,
            hasMore: leadList.length === limit,
            msg: "Success",
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


const updateClient = async (req, res) => {
    try {
        const { clientId, clientStatus, comment, reminderDate } = req.body;

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");

        const result = await clientLeadCollection.updateOne(
            { _id: new mongoose.Types.ObjectId(clientId) },
            {
                $push: {
                    comment: {
                        Date: comment.Date,
                        Time: comment.Time,
                        Comment: comment.Comment
                    }
                },
                $set: {
                    clientStatus: clientStatus,
                    reminderDate: reminderDate ? new Date(reminderDate) : null,
                    lastUpdateDate: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ msg: "Client not found" });
        }

        return res.status(200).json({ msg: "Update Successful" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


const managerUntouchClient = async (req, res) => {
    try {
        const { _id } = req.user;
        const { limit, lastClientId } = req.query;

        let clientLimit = Math.min(Number(limit) || 20, 100)

        const db = mongoose.connection.db;
        const clientListCollection = db.collection("clientLead");

        const query = {
            clientId: null,
            $or: [
                { clientStatus: null },
                { teamStatus: "UNASSIGNED" }
            ]
        }

        if (lastClientId) {
            query._id = { $gt: new Types.ObjectId(lastClientId) }
        }

        const clientList = await clientListCollection.find(query)
            .sort({ createdAt: -1 })
            .limit(clientLimit)
            .toArray();

        if (clientList.length === 0) {
            return res.status(404).json({ msg: "Not Found Un-Touch Client" });
        }

        return res.status(200).json({ clientList: clientList, msg: "Successful" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const employeeUntouchClient = async (req, res) => {
    try {
        const { _id } = req.user;
        const { limit, lastClientId } = req.query;

        const clientLimit = Math.min(Number(limit) || 20, 100);

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");

        let query = {
            status: "UNASSIGNED"
        }

        if (lastClientId) {
            query._id = { $gt: new Types.ObjectId(lastClientId) };
        }

        let clientList = await clientLeadCollection.find(query)
            .sort({ createdAt: -1 })
            .limit(clientLimit)
            .toArray();

        if (clientList.length === 0) {
            return res.status(404).json({ msg: 'Client Lead is Not Found' });
        }

        return res.status(200).json({ clientList: clientList, msg: "Successful" });

    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const deleteClient = async (req, res) => {
    try {
        const { _id } = req.user;
        const { lastDate } = req.query;

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");

        const query = {
            assignedTo: _id,
            lastUpdateDate: { $lte: lastDate }
        }

        await clientLeadCollection.deleteMany(query);

        return res.status(200).json({ msg: "SucessFul" });

    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const employeeHistory = async (req, res) => {
    try {
        const { _id } = req.user;
        const { limit, lastClientId } = req.query;

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");

        let clientLimit = Math.min(Number(limit) || 20, 100);

        let query = {
            assignedTo: _id,
            lastUpdateDate: { $ne: null }
        }

        if (lastClientId) {
            query._id = { $gt: new Types.ObjectId(lastClientId) }
        }

        const clientList = await clientLeadCollection.find(query)
            .sort({ createdAt: -1 })
            .limit(clientLimit)
            .toArray();

        if (clientList.length === 0) {
            return res.status(404).json({ msg: "No Data is Found." });
        }

        return res.status(200).json({ clientList: clientList, msg: "SucessFul" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const untouchDataHIstory = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");

        const pipeline = [
            {
                $match: {
                    clientStatus: null,
                    status: "ASSIGNED"
                }
            },
            {
                $group: {
                    _id: "$assignedTo",
                    untouchClientCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            {
                $unwind: {
                    path: "$employee",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $project: {
                    _id: 0,
                    employeeId: "$emplyee._id",
                    name: "$employee.name",
                    email: "$employee.email",
                    role: "$employee.role",
                    untouchClientCount: 1
                }
            },
            {
                $sort: { untouchClientCount: -1 }
            }
        ];

        const result = await clientLeadCollection.aggregate(pipeline).toArray();

        if (result.length === 0) {
            return res.status(404).json({ msg: "Untouch data not found." })
        }

        return res.status(200).json({ msg: "SuccessFul", dataList: result });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const untouchData = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const unAssignPage = parseInt(req.query.unAssignPage) || 1;
        const unAssignSkip = (unAssignPage - 1) * limit;

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");

        const untouchMatch = {
            teamStatus: "ASSIGNED",
            $or: [
                { clientStatus: null },
                { clientStatus: { $exists: false } },
            ]
        };

        const untouchPipeline = [
            { $match: untouchMatch },

            {
                $lookup: {
                    from: "users",
                    localField: "assignedTo",
                    foreignField: "_id",
                    as: "employee",
                },
            },

            { $unwind: "$employee" },

            {
                $project: {
                    _id: 1,
                    CompanyName: "$company_name",
                    ClientName: "$client_name",
                    Email: "$email",
                    Contact_No: "$contact",
                    Role: "$employee.role",
                    TransferDate: "$assignedAt",
                },
            },

            { $sort: { TransferDate: 1, _id: 1 } },

            { $skip: skip },
            { $limit: limit },
        ];

        const untouch = await clientLeadCollection
            .aggregate(untouchPipeline)
            .toArray();

        const untouchTotal = await clientLeadCollection.countDocuments(
            untouchMatch
        );

        const unAssignData = await clientLeadCollection
            .find({ teamStatus: "UNASSIGNED" })
            .sort({ _id: 1 })
            .skip(unAssignSkip)
            .limit(limit)
            .toArray();

        const unAssignTotal = await clientLeadCollection.countDocuments({
            teamStatus: "UNASSIGNED",
        });

        if (!untouch.length && !unAssignData.length) {
            return res.status(404).json({ msg: "No data found" });
        }

        return res.status(200).json({
            msg: "Success",
            untouchLead: {
                page,
                limit,
                totalRecords: untouchTotal,
                totalPages: Math.ceil(untouchTotal / limit),
                data: untouch,
            },
            unAssignData: {
                page: unAssignPage,
                limit,
                totalRecords: unAssignTotal,
                totalPages: Math.ceil(unAssignTotal / limit),
                data: unAssignData,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const searchUntouchDataByEmail = async (req, res) => {
    try {
        const { email } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const employee = await UserModel.findOne({ email: email });

        if(!employee){
            return res.status(404).json({msg: "Employee Not Found"})
        }

        const db = mongoose.connection.db;
        const clientLeadCollection = db.collection("clientLead");

        const untouchMatch = {
            teamStatus: "ASSIGNED",
            assignedTo: employee._id,
            $or: [
                { clientStatus: null },
                { clientStatus: { $exists: false } },
            ]
        };

        const untouchPipeline = [
            { $match: untouchMatch },

            {
                $lookup: {
                    from: "users",
                    localField: "assignedTo",
                    foreignField: "_id",
                    as: "employee",
                },
            },

            { $unwind: "$employee" },

            {
                $project: {
                    _id: 1,
                    CompanyName: "$company_name",
                    ClientName: "$client_name",
                    Email: "$email",
                    Contact_No: "$contact",
                    Role: "$employee.role",
                    TransferDate: "$assignedAt",
                },
            },

            { $sort: { TransferDate: 1, _id: 1 } },
            { $skip: skip },
            { $limit: limit },
        ];

        const untouch = await clientLeadCollection
            .aggregate(untouchPipeline)
            .toArray();

        const untouchTotal = await clientLeadCollection.countDocuments(
            untouchMatch
        );

        if (!untouch.length && !untouchTotal.length) {
            return res.status(404).json({ msg: "Un-touch data not found." })
        }

        return res.status(200).json({
            msg: "Successful",
            untouchLead: {
                page,
                limit,
                totalRecords: untouchTotal,
                totalPages: Math.ceil(untouchTotal / limit),
                data: untouch,
            },
        })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


export {
    excelFile,
    csvFile,
    teamAssignLeads,
    assignLeadsByTeamLead,
    getAssignedLeadList,
    updateClient,
    managerUntouchClient,
    employeeUntouchClient,
    deleteClient,
    employeeHistory,
    untouchDataHIstory,
    untouchData,
    assignLeadsByManager,
    searchUntouchDataByEmail
};