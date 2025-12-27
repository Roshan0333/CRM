import Client_Model from "../../models/salesDepartment/client.models.js";
import EmployeeHandleClientHistory from "../../models/salesDepartment/salesEmployeeHistory.models.js";


const add_Client = async (req, res) => {
    try {
        const { CompanyName, ClientName, Email_Id, Contact_No, CurrentStatus, Comments, LastUpdate_Date, Reminder_Date } = req.body;

        const {_id} = req.user;

        const todayDate = new Date().toLocaleDateString("en-IN");

        const clientData = Client_Model({
            EmployeeIds: {
                EmployeeId: req.user._id,
                ClientStatus: CurrentStatus
            },
            CompanyName: CompanyName,
            ClientName: ClientName,
            Email_Id: Email_Id,
            Contact_No: Contact_No,
            CurrentStatus: CurrentStatus,
            Comments: [{
                Date: Comments.Date,
                Time: Comments.Time,
                Comment: Comments.Comment
            }],
            LastUpdate_Date: LastUpdate_Date,
            Reminder_Date: Reminder_Date
        });

         await clientData.save();

        const updateEmployeeHistory = await EmployeeHandleClientHistory({
            employeeId: _id,
            clientId: clientData._id,
            handledDate: todayDate
        })

        await updateEmployeeHistory.save();

        return res.status(200).json({ msg: "Data Upload Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const update_ClientData = async (req, res) => {
    try {
        const { ClientId, Status, Comments, LastUpdate_Date, Reminder_Date } = req.body;

        const {_id} = req.user;

        await Client_Model.findByIdAndUpdate(
            { _id: ClientId },
            {
                $set: {
                    CurrentStatus: Status,
                    LastUpdate_Date: LastUpdate_Date,
                    Reminder_Date: Reminder_Date
                },
                $push: {
                    EmployeeIds: {
                        EmployeeId: req.user,
                        ClientStatus: Status,
                    },
                    Comments: {
                        Date: Comments.Date,
                        Time: Comments.Time,
                        Comment: Comments.Comment
                    }
                }
            }
        )

        const updateEmployeeHistory = await EmployeeHandleClientHistory({
            employeeId: _id,
            clientId: ClientId,
            handledDate: todayDate
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
        let hotClient = await Client_Model.find({ ClientType: "hot client" });

        if (hotClient.length === 0) {
            return res.status(200).json({ msg: "No Hor Client Availabel" });
        }

        return res.status(200).json({ HotClient: hotClient, msg: "Successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export {add_Client, update_ClientData, delete_Client, get_HotClient};



