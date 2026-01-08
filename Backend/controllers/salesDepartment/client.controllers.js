import Client_Model from "../../models/salesDepartment/client.models.js";
import EmployeeHandleClientHistory from "../../models/salesDepartment/salesEmployeeHistory.models.js";
import SalesTeam_Model from "../../models/salesDepartment/salesTeams.models.js";


const add_Client = async (req, res) => {
    try {
        let { CompanyName, ClientName, Email_Id, Contact_No, Comments, Reminder_Date, ClientType } = req.body;

        const { _id, role } = req.user;

        const today = new Date();
        const updateDate = today.toLocaleDateString("en-GB");

        let teamId = "";

        const clientValidation = await Client_Model.findOne(
            {
                $or: [
                    { Email_Id: Email_Id },
                    { Contact_No: Contact_No },
                ]
            })

        if (clientValidation) {
            return res.status(401).json({ msg: "Client Already Added." })
        }

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

        const clientData = Client_Model({
            EmployeeIds: {
                EmployeeId: _id,
                ClientStatus: "Add New Client",
                Date: updateDate
            },
            CompanyName: CompanyName,
            ClientName: ClientName,
            Email_Id: Email_Id,
            Contact_No: Contact_No,
            AdderId: _id,
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
            LastUpdate_Date: today,
            Reminder_Date: Reminder_Date,
            ClientType: ClientType,
            AddDate: today
        });

        await clientData.save();

        const updateEmployeeHistory = await EmployeeHandleClientHistory({
            employeeId: _id,
            clientId: clientData._id,
            companyName: CompanyName,
            clientName: ClientName,
            email_Id: Email_Id,
            contact_No: Contact_No,
            reminder_Date: Reminder_Date,
            comment: Comments.Comment,
            handledDate: today
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
        let { ClientId, Status, Comments, Reminder_Date, SalesStatus } = req.body;

        const { _id } = req.user;

        if(Comments.Comment === "Sold"){
            Reminder_Date = new Date().toISOString().split("T")[0];
        }

        const today = new Date();

        let clientDetail = null;

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
                        LastUpdate_Date: todayDate,
                        Reminder_Date: Reminder_Date,
                        SalesStatus: SalesStatus,
                    },
                    $push: {
                        EmployeeIds: {
                            EmployeeId: _id,
                            ClientStatus: Status,
                            Date: todayDate
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
            clientDetail = await Client_Model.findByIdAndUpdate(
                { _id: ClientId },
                {
                    $set: {
                        CurrentStatus: Status,
                        LastUpdate_Date: today,
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
            companyName: clientDetail.CompanyName,
            clientName: clientDetail.ClientName,
            email_Id: clientDetail.Email_Id,
            contact_No: clientDetail.Contact_No,
            reminder_Date: Reminder_Date,
            comment: Comments.Comment,
            handledDate: today
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

const get_CurrentMonthProspect = async (req, res) => {
    try {
        let { _id } = req.user;

        const startofMonth = new Date();
        startofMonth.setDate(1);
        startofMonth.setHours(0, 0, 0, 0);

        const endofMonth = new Date();
        endofMonth.setMonth(endofMonth.getMonth() + 1);
        endofMonth.setDate(0); 
        endofMonth.setHours(23, 59, 59, 999);

        const prospectList = await Client_Model.find({
            AdderId: _id,
            AddDate: {
                $gte: startofMonth,
                $lte: endofMonth
            }
        });


        return res.status(200).json({ ProspectList: prospectList, msg: "Successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export { add_Client, update_ClientData, delete_Client, get_HotClient, get_CurrentMonthProspect };



