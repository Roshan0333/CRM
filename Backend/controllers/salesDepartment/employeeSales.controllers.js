import Sales_Model from "../../models/salesDepartment/sales.models.js";
import SalesTeam_Model from "../../models/salesDepartment/salesTeams.models.js";
import client_Model from "../../models/salesDepartment/client.models.js";

const post_Sale = async (req, res) => {
    try {
        const { ClientId, Service, Amount } = req.body;

        const { _id, role } = req.user;

        const salesDate = new Date();

        let salesDone = null;

        if (role === "sales manager") {

            salesDone = await Sales_Model({
                ClientId: ClientId,
                Date: salesDate,
                SalerId: _id,
                TeamLeaderId: null,
                SalesExecutiveId: null,
                Service: Service,
                Amount: Amount,
                PayAmount: 0,
                Confirm:false,
            });
        }
        else if (role === "sales team lead") {
            salesDone = await Sales_Model({
                ClientId: ClientId,
                Date: salesDate,
                SalerId: _id,
                TeamLeaderId: _id,
                SalesExecutiveId: null,
                Service: Service,
                Amount: Amount
            });
        }
        else {
            const teamData = await SalesTeam_Model.findOne({
                "Members.MemberId": _id
            });

            salesDone = await Sales_Model({
                ClientId: ClientId,
                Date: salesDate,
                SalerId: _id,
                TeamLeaderId: teamData.TLId,
                SalesExecutiveId: _id,
                Service: Service,
                Amount: Amount
            });

            client_Model.findByIdAndUpdate(
                ClientId,
                { SalesStatus: "Sold" })
        }

        await salesDone.save();
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const TotalSalesBy_Id = async (req, res) => {
    try {
        const { _id } = req.user;   // user requesting sales

        const now = new Date();

        const startOfMonth = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            1,
            0, 0, 0, 0
        ));

        const endOfMonth = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth() + 1,
            1,
            0, 0, 0, 0
        ));

        const pipeline = [
            {
                $match: {
                    SalerId: _id,
                    Date: {
                        $gte: startOfMonth,
                        $lt: endOfMonth
                    },
                    Confirm: true
                }
            },
            {
                $lookup: {
                    from: "clients",
                    localField: "ClientId",
                    foreignField: "_id",
                    as: "ClientDetails"
                }
            },
            { $unwind: "$ClientDetails" },
            { $sort: { Date: -1 } },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount" },
                    count: { $sum: 1 },
                    sales: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalAmount: 1,
                    count: 1,
                    sales: 1
                }
            }
        ];

        const totalSales = await Sales_Model.aggregate(pipeline);

        if (!totalSales.length) {
            return res.status(404).json({ msg: "No Sales Found This Month" });
        }

        return res.status(200).json({ TotalSales: totalSales, msg: "Successfully" })

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// const teamLeader_TotalSales = async (req, res) => {
//     try {
//         const { _id } = req.user;

//         const totalSales = await Sales_Model.find({ TeamLeaderId: _id });

//         if (totalSales.length === 0) {
//             return res.status(404).json({ msg: "No found" });
//         }

//         return res.status(200).json({ TotalSales: totalSales, msg: "Successfully" })
//     }
//     catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// }

const currentYearSales = async (req, res) => {
    try {
        let date = new Date(Date.UTC(2026, 0, 1, 0, 0, 0));

        let salesList = await Sales_Model.aggregate([
            {
                $match: {
                    Date: {
                        $gte: date
                    },
                    Confirm: true
                }
            },
            {
                $lookup: {
                    from: "clients",
                    localField: "ClientId",
                    foreignField: "_id",
                    as: "ClientDetails"
                }
            },
            { $unwind: "$ClientDetails" },
            {
                $lookup:{
                    from:"users",
                    localField:"SalerId",
                    foreignField:"_id",
                    as:"SalerDetail"
                }
            },
            {$unwind: "$SalerDetail"},
            {
                $lookup:{
                    from:"users",
                    localField:"TeamLeaderId",
                    foreignField:"_id",
                    as:"TeamLeaderDetail"
                }
            },
            {$unwind: "$TeamLeaderDetail"},
            { $sort: { Date: -1 } },
        ])

        if (!salesList.length) {
            return res.status(404).json({ msg: "No Sales Found This Year" });
        }

        return res.status(200).json({ TotalSales: salesList, msg: "Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export { post_Sale, TotalSalesBy_Id, currentYearSales };

