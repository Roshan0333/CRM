import User from "../../models/User.js";
import SalesTeam_Model from "../../models/salesDepartment/salesTeams.models.js";

const addTeam_SalesTeamLead = async (req, res) => {
    try {
        let { firstName, lastName, email, contact, location, joiningDate } = req.body

        let employeeDetail = await User.findOne({ email: email });

        joiningDate = new Date(joiningDate.toString()).toLocaleDateString("en-GB");


        let contactValidation = await SalesTeam_Model.findOne({
            TLContact_No: contact
        })

        let idValidation = await SalesTeam_Model.findOne({
            TLId: employeeDetail._id
        })

        if (!employeeDetail) {
            return res.status(404).json({ msg: "Employee Not Found." });
        }

        if (firstName !== employeeDetail.firstName || lastName !== employeeDetail.lastName) {
            return res.status(401).json({ msg: "Employee Name is not correct" });
        }

        if (idValidation) {
            return res.status(401).json({ msg: "Duplicate Email." });
        };

        if (contactValidation) {
            return res.status(401).json({ msg: "Duplicate Contact Number" })
        }

        let teamDetails = SalesTeam_Model({
            TLId: employeeDetail._id,
            TLStatus: "Active",
            TLName: `${firstName} ${lastName}`,
            TLContact_No: contact,
            TLEmail_Id: email,
            TLLocation: location,
            TLJoiningDate: joiningDate
        });

        await teamDetails.save();

        return res.status(200).json({ msg: "Successfully" });

    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const addTeam_SalesExcutive = async (req, res) => {
    try {
        const { _id } = req.user;
        let { name, email, contact, location, joiningDate } = req.body;

        const employeeDetail = await User.findOne({ email: email });

        joiningDate = new Date(joiningDate.toString()).toLocaleDateString("en-GB");

        const contactValidation = await SalesTeam_Model.findOne({
            $or: [
                { TLContact_No: contact },
                { "Members.Contact_No": contact }
            ]
        });

        const idValidation = await SalesTeam_Model.findOne({
            $or: [
                { TLId: employeeDetail._id },
                { "Members.MemberId": employeeDetail._id }
            ]
        })

        if (idValidation) {
            return res.status(401).json({ msg: "Duplicate Email" })
        }

        if (contactValidation) {
            return res.status(401).json({ msg: "Duplicate Contact Number." })
        }

        if (`${employeeDetail.firstName} ${employeeDetail.lastName}` !== name) {
            return res.status(401).json({ msg: "Employee Name is not correct" });
        }

        await SalesTeam_Model.findOneAndUpdate(
            { TLId: _id },
            {
                $push: {
                    Members: {
                        MemberId: employeeDetail._id,
                        Status: "Active",
                        Name: name,
                        Contact_No: contact,
                        Email_Id: email,
                        Location: location,
                        TeamJoiningDate: joiningDate
                    }
                }
            }
        );

        return res.status(200).json({ msg: "Successfully" });

    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export { addTeam_SalesTeamLead, addTeam_SalesExcutive };