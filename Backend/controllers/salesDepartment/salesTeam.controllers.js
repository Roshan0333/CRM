import User from "../../models/User.js";
import SalesTeam_Model from "../../models/salesDepartment/salesTeams.models.js";
import bcrypt from "bcrypt";
import UserModel from "../../models/User.js";
import mongoose from "mongoose";

const addTeam_SalesTeamLead = async (req, res) => {
  try {
    const { _id } = req.user;

    let {
      name,
      bankName,
      ifsc,
      bankAccount,
      email,
      password,
      department,
      role,
      contact,
      location,
      upiId,
      joiningDate,
    } = req.body;

    email = email?.trim().toLowerCase();
    department = department?.trim().toLowerCase();
    role = role?.trim().toLowerCase();

    if (!email || !password || !department || !role || !name) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    const nameArray = name.split(" ");

    const userExists = await User.findOne({
      $or: [{ email }, { contact }],
    });

    if (userExists) {
      return res.status(400).json({ msg: "Email or contact already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: nameArray[0],
      lastName: nameArray[1] || "",
      bankName,
      ifsc,
      bankAccount,
      email,
      password: hashedPassword,
      department,
      role,
      contact,
      location,
      upiId,
      joiningDate,
    });

    const userDetail = await user.save();

    const teamDetails = new SalesTeam_Model({
      ManagerId: _id,
      TLId: userDetail._id,
      TLStatus: "Active",
      TLName: name,
      TLContact_No: contact,
      TLEmail_Id: email,
      TLLocation: location,
      TLJoiningDate: joiningDate,
      Members: [],
    });

    await teamDetails.save();

    return res.status(201).json({
      msg: "Sales Team Lead created successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const addTeam_SalesExcutive = async (req, res) => {
  try {
    let { name, email, contact, location, joiningDate, teamLeaderEmail } = req.body;


    const employeeDetail = await User.findOne({ email: email });

    const contactValidation = await SalesTeam_Model.findOne({
      $or: [
        { TLContact_No: contact },
        { "Members.Contact_No": contact }
      ]
    });

    const idValidation = await SalesTeam_Model.findOne({
      $or: [
        { TLEmail_Id: email },
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

    const team = await SalesTeam_Model.findOne({ TLEmail_Id: teamLeaderEmail });
    console.log(team);
    console.log(teamLeaderEmail)

    const array = await SalesTeam_Model.findOneAndUpdate(
      { TLEmail_Id: teamLeaderEmail },
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

    console.log(array)

    return res.status(200).json({ msg: "Successfully" });

  }
  catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

const addTeam_ExistsTL = async (req, res) => {
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

    let TLDocument = SalesTeam_Model({
      ManagerId: _id,
      TLId: employeeDetail._id,
      TLStatus: "Active",
      TLName: name,
      TLContact_No: contact,
      TLEmail_Id: email,
      TLLocation: location,
      TLJoiningDate: joiningDate,
      Members: []
    })

    await TLDocument.save();

    return res.status(200).json({ msg: "Successfully" });
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const employeePermotion = async (req, res) => {
  try {
    const { currentPosition, premotedPostion, employeeEmail } = req.body;
    const { _id } = req.user;

    let teamDetail = [];

    if (currentPosition === "sales team lead") {
      const employeeDetail = await SalesTeam_Model.findOneAndDelete({ TLEmail_Id: employeeEmail });

      if (!employeeDetail) {
        return res.status(404).json({ msg: "Employee Not Found." });
      }

      await UserModel.findOneAndUpdate(
        { email: employeeEmail },
        { role: premotedPostion }
      )
      teamDetail = employeeDetail.Members;
    }
    else {
      let deleteEmployeeDetail = await SalesTeam_Model.findOneAndUpdate(
        { "Members.Email_Id": employeeEmail },
        {
          $pull: {
            Members: {
              Email_Id: employeeEmail
            }
          }
        }
      );

      if (!deleteEmployeeDetail) {
        return res.status(404).json({ msg: "Employee Not Found." });
      }

      const memberDetail = deleteEmployeeDetail.Members.find(
        member => member.Email_Id.toString() === employeeEmail.toString()
      )

      let TLDetail = SalesTeam_Model({
        ManagerId: _id,
        TLId: memberDetail.MemberId,
        TLStatus: "Active",
        TLName: memberDetail.Name,
        TLContact_No: memberDetail.Contact_No,
        TLEmail_Id: employeeEmail,
        TLLocation: memberDetail.Location,
        TLJoiningDate: memberDetail.TeamJoiningDate,
        Members: []
      })

      await TLDetail.save();

      await UserModel.findOneAndUpdate(
        { email: employeeEmail },
        { role: premotedPostion }
      )
    }

    return res.status(200).json({ msg: "Employee Premoted", teamDetail: teamDetail })
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const addSalesExcutiveByManager = async (req, res) => {
  try {
    let { name, bankName, ifsc, bankAccount, email, password, department, role, contact, location, upiId, joiningDate, teamLeadEmail } = req.body;

    name = name.trim();
    email = email.trim().toLowerCase();
    department = department.trim().toLowerCase();
    role = role.trim().toLowerCase();

    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!email || !password || !department || !role) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    let nameArray = name.split(/\s+/);

    let firstName = nameArray[0];
    let lastName = (nameArray.length === 1) ? "" : nameArray[1]

    const userExits = await User.findOne({
      $or: [
        { email: email },
        { contact: contact }
      ]
    });

    const team = await SalesTeam_Model.findOne({
      TLEmail_Id: teamLeadEmail,
      "Members.Email_Id": email
    });

    if (team) {
      return res.status(400).json({ msg: "Member already exists in this team" });
    }

    if (userExits) {
      return res.status(400).json({ msg: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = User({
      firstName,
      lastName,
      bankName,
      ifsc,
      bankAccount,
      email,
      password: hashedPassword,
      department,
      role,
      contact,
      location,
      upiId,
      joiningDate
    })

    const userDetail = await user.save()

    await SalesTeam_Model.findOneAndUpdate(
      { TLEmail_Id: teamLeadEmail },
      {
        $push: {
          Members: {
            MemberId: userDetail._id,
            Status: "Active",
            Name: name,
            Contact_No: contact,
            Email_Id: email,
            Location: location,
            TeamJoiningDate: joiningDate
          }
        }
      },
      { new: true }
    );

    return res.status(200).json({ msg: "Employee Add Successfully" });
  }
  catch (err) {
    return res.status(500).json({ error: err.message, name: err.name });
  }
}

const getAllEmployee = async (req, res) => {
  try {
    const managerId = new mongoose.Types.ObjectId(req.user._id);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await SalesTeam_Model.aggregate([
      {
        $match: { ManagerId: managerId }
      },
      {
        $lookup: {
          from: "users",
          localField: "ManagerId",
          foreignField: "_id",
          as: "managerDetail"
        }
      },
      { $unwind: "$managerDetail" },
      {
        $lookup: {
          from: "users",
          localField: "TLId",
          foreignField: "_id",
          as: "teamLeader"
        }
      },
      { $unwind: "$teamLeader" },
      {
        $unwind: {
          path: "$Members",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "Members.MemberId",
          foreignField: "_id",
          as: "memberDetail"
        }
      },
      {
        $unwind: {
          path: "$memberDetail",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$TLId",
          managerInfo: { $first: "$managerDetail" },
          TLInfo: { $first: "$teamLeader" },
          TLName: { $first: "$TLName" },
          TLEmail_Id: { $first: "$TLEmail_Id" },
          TLContact_No: { $first: "$TLContact_No" },
          TLLocation: { $first: "$TLLocation" },
          TLJoiningDate: { $first: "$TLJoiningDate" },
          TLStatus: { $first: "$TLStatus" },
          Members: {
            $push: {
              MemberInfo: "$memberDetail",
              Status: "$Members.Status",
              Location: "$Members.Location",
              TeamJoiningDate: "$Members.TeamJoiningDate"
            }
          }
        }
      },
      {
        $project: {
          managerInfo: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            role: 1,
          },
          TLInfo: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            role: 1,
            bankName: 1,
            bankAccount: 1,
            ifsc: 1,
            upiId: 1,
          },
          TLName: 1,
          TLEmail_Id: 1,
          TLContact_No: 1,
          TLLocation: 1,
          TLJoiningDate: 1,
          TLStatus: 1,
          Members: {
            $filter: {
              input: "$Members",
              as: "m",
              cond: { $ne: ["$$m.MemberInfo", null] }
            }
          }
        }
      },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit }
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ]);

    const userDetails = result[0].data;
    const totalRecords = result[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalRecords / limit);

    return res.status(200).json({
      msg: "Successful",
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages
      },
      userDetails
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


const updateEmployeeDetail = async (req, res) => {
  try {
    const { employeeId, bankName, bankAccount, ifsc, upiId } = req.body

    if (!employeeId) {
      return res.status(400).json({ msg: "Employee Id is Required" });
    }

    await UserModel.findByIdAndUpdate(
      employeeId,
      {
        bankName,
        ifsc,
        bankAccount,
        upiId
      }
    )

    return res.status(200).json({ msg: "User Detail Update Successfully." })
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const updateEmployeeStatus = async (req, res) => {
  try {
    const { employeeId, status, role } = req.body;

    if (!status || status === "") {
      return res.status(400).json({ msg: "Status is Required" });
    }

    if (role === "sales team lead") {
      await SalesTeam_Model.findOneAndUpdate(
        { TLId: employeeId },
        { TLStatus: status }
      )
    }
    else {
      await SalesTeam_Model.findOneAndUpdate(
        { "Members.MemberId": employeeId },
        { $set: { "Members.$.Status": status } },
        { new: true }
      )
    }

    return res.status(200).json({ msg: "Employee Status Update Successfully" });
  }
  catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const deleteEmployeeDetail = async (req, res) => {
  try {
    const { employeeId, role } = req.body;

    let teamDetail = [];

    if (role === "sales team lead") {

      const deleteItem = await SalesTeam_Model.findOneAndDelete(
        { TLId: employeeId }
      )

      if (!deleteItem) {
        return res.status(400).json({ msg: "Employee Not Delete" });
      }
      else {
        teamDetail = deleteItem.Members
      }
    }
    else {
      const deleteItem = await SalesTeam_Model.findOne(
        { "Members.MemberId": employeeId },
        {
          $pull: {
            Members: {
              MemberId: employeeId
            }
          }
        }
      )

      if (!deleteItem) {
        return res.status(400).json({ msg: "Employee Not Delete" });
      }
    }

    await UserModel.findByIdAndDelete(employeeId);

    return res.status(200).json({ msg: "Employee Delete Successfully", teamDetail: teamDetail });
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export {
  addTeam_SalesTeamLead,
  addTeam_SalesExcutive,
  addTeam_ExistsTL,
  addSalesExcutiveByManager,
  getAllEmployee,
  updateEmployeeDetail,
  updateEmployeeStatus,
  deleteEmployeeDetail,
  employeePermotion
};