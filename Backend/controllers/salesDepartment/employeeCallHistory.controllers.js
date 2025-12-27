import EmployeeHandleClientHistory from "../../models/salesDepartment/salesEmployeeHistory.models.js";
import { convertToDate } from "../../utlites/convertToDate.js";

const getToday_CallList = async (req, res) => {
    try {
        const { _id } = req.user;

        let todaydate = new Date().toLocaleDateString("en-IN");

        let callList = await EmployeeHandleClientHistory.find({ employeeId: _id, handledDate: todaydate });

        if (callList.length === 0) {
            return res.status(200).json({ msg: "No call today" });
        }

        return res.status(200).json({ TodayCallList: callList, msg: "Successfully" });
    }
    catch (err) {
        return res.status(500).json({error: err.message})
    }
}


const getCustomDate_CallList = async (req, res) => {
    try {
        const { StartDate, LastDate } = req.query;
        const { _id } = req.user;

        const callList = await EmployeeHandleClientHistory.find({
            employeeId: _id,
            handledDate: {
                $gte: convertToDate(StartDate),
                $lte: convertToDate(LastDate)
            }
        });

        if(callList.length === 0){
            return res.status(200).json({msg:"No CallList Availabel"});
        }

        return res.status(200).json({CallList: callList, msg: "Successfully"});
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export {getToday_CallList, getCustomDate_CallList};