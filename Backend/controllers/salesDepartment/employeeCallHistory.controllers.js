import EmployeeHandleClientHistory from "../../models/salesDepartment/salesEmployeeHistory.models.js";
import { convertToDate } from "../../utlites/convertToDate.js";

const getToday_CallList = async (req, res) => {
    try {
        const { _id } = req.user;

        let todaydate = new Date();
        let startOfDay = new Date(todaydate.setHours(0, 0, 0, 0));
        let endOfDay = new Date(todaydate.setHours(23, 59, 59, 999));

        let callList = await EmployeeHandleClientHistory.find({ 
            employeeId: _id, 
            handledDate: {
                $gte:startOfDay,
                $lte: endOfDay
            }
        });

        if (callList.length === 0) {
            return res.status(404).json({ msg: "No call today" });
        }

        return res.status(200).json({ TodayCallList: callList, msg: "Successfully" });
    }
    catch (err) {
        return res.status(500).json({error: err.message})
    }
}


const getCustomDate_CallList = async (req, res) => {
    try {
        let { StartDate, LastDate } = req.query;
        const { _id } = req.user;

        let startDate = new Date(StartDate);
        let endDate = new Date(LastDate);

        let startOfDay = new Date(startDate.setHours(0, 0, 0, 0));
        let endOfDay = new Date(endDate.setHours(23, 59, 59, 999));

        const callList = await EmployeeHandleClientHistory.find({
            employeeId: _id,
            handledDate: {
                $gte:startOfDay,
                $lte:endOfDay
            }
        });

        if(callList.length === 0){
            return res.status(404).json({msg:"No CallList Availabel"});
        }

        return res.status(200).json({CallList: callList, msg: "Successfully"});
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export {getToday_CallList, getCustomDate_CallList};