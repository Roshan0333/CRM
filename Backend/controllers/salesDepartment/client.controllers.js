import Client_Model from "../../models/salesDepartment/client.models.js";
import EmployeeHandleClientHistory from "../../models/salesDepartment/salesEmployeeHistory.models.js";
import SalesTeam_Model from "../../models/salesDepartment/salesTeams.models.js";


const add_Client = async (req, res) => {
    try {
        const { CompanyName, ClientName, Email_Id, Contact_No, Comments, Reminder_Date, ClientType } = req.body;

        const { _id, role } = req.user;

        const todayDate = new Date().toLocaleDateString("en-CA");

        let teamId = null;

        if (role !== "sales manager") {
            if (role === "sales executive") {
                let teamDetail = await SalesTeam_Model.findOne({ "Members.MemberId": _id });
                teamId = teamDetail._id;
            }
            else {
                let teamDetail = await SalesTeam_Model.findOne({ TLId: _id });
                teamId = teamDetail._id;
            }
        }
        else {
            teamId = null;
        }

        const clientData = Client_Model({
            EmployeeIds: {
                EmployeeId: _id,
                ClientStatus: "Add New Client",
                Date: todayDate.toString()
            },
            CompanyName: CompanyName,
            ClientName: ClientName,
            Email_Id: Email_Id,
            Contact_No: Contact_No,
            AddedBy: role,
            TeamId: teamId,
            CurrentStatus: "Add New Client",
            SalesStatus: "No Sale",
            Comments: [{
                EmployeeId: _id,
                Date: Comments.Date,
                Time: Comments.Time,
                Comment: Comments.Comment
            }],
            LastUpdate_Date: todayDate.toString(),
            Reminder_Date: Reminder_Date,
            ClientType: ClientType,
            AddDate: todayDate.toString()
        });

        await clientData.save();

        const updateEmployeeHistory = await EmployeeHandleClientHistory({
            employeeId: _id,
            clientId: clientData._id,
            handledDate: todayDate.toString()
        })

        await updateEmployeeHistory.save();

        return res.status(200).json({ msg: "Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const update_ClientData = async (req, res) => {
    try {
        const { ClientId, Status, Comments, Reminder_Date, SalesStatus } = req.body;

        const { _id } = req.user;

        const todayDate = new Date().toLocaleDateString("en-CA");

        let employeeAdded = await Client_Model.findOne({
            _id: ClientId,
            "EmployeeIds.EmployeeId": _id
        });


        if (!employeeAdded) {
            await Client_Model.findByIdAndUpdate(
                { _id: ClientId },
                {
                    $set: {
                        CurrentStatus: Status,
                        LastUpdate_Date: todayDate.toString(),
                        Reminder_Date: Reminder_Date,
                        SalesStatus: SalesStatus,
                    },
                    $push: {
                        EmployeeIds: {
                            EmployeeId: _id,
                            ClientStatus: Status,
                            Date: todayDate.toString()
                        },
                        Comments: {
                            Date: Comments.Date,
                            Time: Comments.Time,
                            Comment: Comments.Comment
                        }
                    }
                }
            )
        }
        else {
            await Client_Model.findByIdAndUpdate(
                { _id: ClientId },
                {
                    $set: {
                        CurrentStatus: Status,
                        LastUpdate_Date: todayDate.toString(),
                        Reminder_Date: Reminder_Date,
                        SalesStatus: SalesStatus,
                    },
                    $push: {
                        Comments: {
                            Date: Comments.Date,
                            Time: Comments.Time,
                            Comment: Comments.Comment
                        }
                    }
                }
            )
        }

        const updateEmployeeHistory = await EmployeeHandleClientHistory({
            employeeId: _id,
            clientId: ClientId,
            handledDate: todayDate.toString()
        })

        await updateEmployeeHistory.save();

        return res.status(200).json({ msg: "Client Data Update Successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const delete_Client = async (req, res) => {
    try {
        const { ClientId } = req.body;

        await Client_Model.findByIdAndDelete(
            { _id: ClientId }
        )

        return res.status(200).json({ msg: "Client Data Successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const get_HotClient = async (req, res) => {
    try {

        let { _id } = req.user;

        let teamDetail = await SalesTeam_Model.findOne({
            Members: {
                $elemMatch: {
                    MemberId: _id,
                    Status: "Active"
                }
            }
        })

        let hotClient = await Client_Model.find({
            TeamId: teamDetail._id,
            ClientType: "High Priority",
            SalesStatus: "No Sale"
        });

        if (hotClient.length === 0) {
            return res.status(404).json({ msg: "No Hot Client Availabel" });
        }

        return res.status(200).json({ HotClient: hotClient, msg: "Successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export { add_Client, update_ClientData, delete_Client, get_HotClient };



