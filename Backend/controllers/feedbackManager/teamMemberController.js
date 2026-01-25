import TeamMember from "../../models/FeedbackManager/TeamMemberSchema.js"

export const getTeamMembers = async (req, res) => {
  try {
    // req.user.id comes from the auth middleware
    const members = await TeamMember.find({ managerId: req.user._id });
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const addTeamMember = async (req, res) => {
  try {
    const newMember = new TeamMember({
      ...req.body,
      managerId: req.user._id, // Linking to the manager
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(400).json({ message: "Validation Error", error: err.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findOneAndDelete({
      _id: req.params.id,
      managerId: req.user.id, // Security: ensure this manager owns the record
    });

    if (!member) return res.status(404).json({ message: "Member not found" });

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const updatedMember = await TeamMember.findOneAndUpdate(
      { _id: req.params.id, managerId: req.user.id },
      { $set: req.body },
      { new: true } // Returns the updated document
    );

    if (!updatedMember) return res.status(404).json({ message: "Member not found" });

    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};
