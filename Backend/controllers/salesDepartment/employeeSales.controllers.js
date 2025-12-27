import Sales_Model from "../../models/salesDepartment/sales.models.js";
import SalesTeam_Model from "../../models/salesDepartment/salesTeams.models.js";

const post_Sale = async (req, res) => {
    try {
        const { ClientId, Service, Amount, ActivityData } = req.body;

        const { _id } = req.user;

        const date = new Date().toLocaleDateString("en-IN");

        const teamData = await SalesTeam_Model.findOne({
            Members: {
                MemberId: _id,
            }
        });

        const salesDone = await Sales_Model({
            ClientId: ClientId,
            Date: date,
            TeamLeaderId: teamData.TLId,
            SalesExecutiveId: _id,
            Service: Service,
            Amount: Amount,
            Activities:{
                Date: ActivityData.Date,
                Activity: ActivityData.Activity
            }
        });

        await salesDone.save();
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const salesExecutive_TotalSales = async (req, res) => {
    try {
        const { _id } = req.user;

        const totalSales = await Sales_Model.find({ SalesExecutiveId: _id });

        if (totalSales.length === 0) {
            return res.status(200).json({ msg: "No Sale" });
        }

        return res.status(200).json({ TotalSales: totalSales, msg: "Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const teamLeader_TotalSales = async (req, res) => {
    try {
        const { _id } = req.user;

        const totalSales = await Sales_Model.find({ TeamLeaderId: _id });

        if (totalSales.length === 0) {
            return res.status(200).json({ msg: "No found" });
        }

        return res.status(200).json({ TotalSales: totalSales, msg: "Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export {post_Sale, salesExecutive_TotalSales, teamLeader_TotalSales };

