import Complaint from "../../models/FeedbackManager/ComplaintSchema.js"
import User from "../../models/User.js"; // Import your User model
import Feedback from "../../models/FeedbackManager/FeedbackSchema.js";

export const getComplaints = async (req, res) => {
  try {
    const { status } = req.query;
    // If status is provided, filter; otherwise, fetch all
    const filter = status ? { status: status } : {};

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error: error.message });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error fetching details", error: error.message });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, note } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Not found" });

    let updatedDiscussion = complaint.discussion || "";

    if (note && note.trim() !== "") {
      const timestamp = new Date().toLocaleString("en-IN", {
        dateStyle: "short",
        timeStyle: "short",
      });

      const newEntry = `[${timestamp}] ${note}`;
      updatedDiscussion = updatedDiscussion
        ? `${newEntry}\n------------------\n${updatedDiscussion}`
        : newEntry;
    }

    const updatedDoc = await Complaint.findByIdAndUpdate(
      id,
      {
        status,
        priority,
        discussion: updatedDiscussion
      },
      { new: true }
    );

    res.status(200).json(updatedDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComplaintFromFeedback = async (req, res) => {
  try {
    const { feedbackId, companyName, email_id, description } = req.body;

    // 1. Find all active employees
    const employees = await User.find({ role: 'feedback employee' });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees available for assignment" });
    }

    // 2. Select a random employee
    const randomIndex = Math.floor(Math.random() * employees.length);
    const selectedEmployee = employees[randomIndex];

    // 3. Create the complaint
    const newComplaint = new Complaint({
      companyName,
      email_id,
      subject: `Resolution Required: ${companyName}`,
      discussion: `${description}\n\n[System]: Complaint generated from client feedback.`,
      feedbackId,
      assignedEmployee: {
        id: selectedEmployee._id,
        name: selectedEmployee.name
      },
      priority: 'High',
      status: 'Unsolved',
      updates: [{ text: "Complaint generated automatically from client feedback.", date: new Date() }]
    });

    await newComplaint.save();

    await Feedback.findByIdAndUpdate(feedbackId, {
      assignedEmployee: {
        id: selectedEmployee._id,
        email: selectedEmployee.email,
        name: selectedEmployee.name
      }
    });

    res.status(201).json({
      message: "Assigned",
      assignedTo: selectedEmployee.email,
      assignedName: selectedEmployee.name
    });
  } catch (error) {
    res.status(500).json({ message: "Assignment failed", error: error.message });
  }
};

// -----------------------------FEEDBACK EMPLOYEE-----------------------------------------------------------------------------
export const getMyAssignedTasks = async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized, no user data" });
    }
    const employeeId = req.user.id;

    const tasks = await Complaint.find({ "assignedEmployee.id": employeeId }).populate('feedbackId').sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching assigned tasks:", error);
    res.status(500).json({ message: "Server Error: Could not fetch tasks" });
  }
};
