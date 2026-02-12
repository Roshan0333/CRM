import Team from "../../models/managementSchema/TeamSchema.js";






//  MANAGER  CAN CREATE / UPDATE TEAM

export const createTeam = async (req, res) => {
  try {
    const { name, position, contact, email, location,bankName, accountNo, ifsc, upiId, joinDate } = req.body
    if (!name || !position || !contact || !email) {
      return res.status(400).json({ msg: "some fields are required" })
    }

    const existingTeamMember = await Team.findOne({ email })
    if (existingTeamMember) {
      return res.status(409).json({
        msg: "Team member available with this email"
      });
    }

    const team = await Team.create({
      name, position, contact, email, location,bankName, accountNo, ifsc, upiId, joinDate
    })

    return res.status(201).json({
      msg: "Team member created successfully!..",
      team
    })

  } catch (error) {
    console.log("Error", error)
    return res.status(500).json({ msg: "Internal server error" })
  }
}



// -------------------------------------update team member----------------------------------

export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params
    const updates = {}
    const allowedField = ["name",
      "position",
      "contact",
      "email",
      "location",
      "bankName",
      "accountNo",
      "ifsc",
      "upiId",
      "joinDate",
      "status"
    ]
    allowedField.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        msg: "No fields provided to update"
      })
    }

    // ==================  status update ==================
    //   if (
    //   updates.status &&
    //   !["Active", "Inactive"].includes(updates.status)
    // ) {
    //   return res.status(400).json({
    //     msg: "Invalid status value",
    //   });
    // }

    //  ================== if changed email is used by another person ===============

    const emailExists = await Team.findOne({
      email: updates.email,
      _id: { $ne: id }
    });

    if (emailExists) {
      return res.status(409).json({
        msg: "Email already in use by another team member"
      })
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ msg: "Team member not found" });
    }

    return res.status(200).json({
      msg: "Team member updated successfully",
      team: updatedTeam
    });

  } catch (error) {
    console.log("Error", error)
    return res.status(400).json({
      msg: "server error"
    })
  }
}

// -----------------------------------------get team members------------------------------------------

 export const getTeamMembers = async (req, res) => {
  try {
    let { designation } = req.query;

    let filter = {};

    if (designation && designation !== "ALL") {
      if (designation === "Management TL") {
        filter.position = { $regex: "^team leader$|^management tl$", $options: "i" };
      }
      if (designation === "Management Employee") {
        filter.position = { $regex: "^employee$|^management employee$", $options: "i" };
      }
    }

    const members = await Team.find(filter);
    res.status(200).json(members);
  } catch (error) {
    console.error("getTeamMembers error:", error);
    res.status(500).json({ message: error.message });
  }
};
//-------------------------------------delete team member -----------------------------------

// DELETE team member
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({
        msg: "Team member not found"
      });
    }

    return res.status(200).json({
      msg: "Team member deleted successfully",
      team: deletedTeam
    });

  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};



// -------------------------------------count controllers-----------------------------------

export const count = async (req, res) => {
  try {
    const tlCount = await Team.countDocuments({
      position: { $regex: "^team leader$|^management tl$", $options: "i" }
    });

    const memberCount = await Team.countDocuments({
      position: { $regex: "^employee$|^management employee$", $options: "i" }
    });

    res.status(200).json({
      success: true,
      tls: tlCount,
      members: memberCount
    });

  } catch (error) {
    console.error("Count controller error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
