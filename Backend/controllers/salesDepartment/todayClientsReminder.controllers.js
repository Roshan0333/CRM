import client_Model from "../../models/salesDepartment/client.models.js";
import SalesTeam_Model from "../../models/salesDepartment/salesTeams.models.js";

const todayReminderCall = async (req, res) => {
    try{

        let {_id} = req.user;

        let todayDate = new Date().toLocaleDateString("en-GB");

        let teamDetails = await SalesTeam_Model.findOne({"Members.MemberId": _id})

        let todayReminderCallList = await client_Model.find({
            TeamId: teamDetails._id,
            Reminder_Date: todayDate.toString()
        });

        if(todayReminderCallList.length === 0){
            return res.status(400).json({msg: "Today no Reminder Call Found."});
        }

        return res.status(200).json({msg:"Successfully", ReminderList: todayReminderCallList});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

export {todayReminderCall};