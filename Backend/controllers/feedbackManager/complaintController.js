import Complaint from "../../models/FeedbackManager/ComplaintSchema.js"

// GET all complaints (Filtered by status)
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

// GET a single complaint by ID (For the View Popup)
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error fetching details", error: error.message });
  }
};

// PATCH update status, priority, and add activity note
export const updateComplaint = async (req, res) => {
  try {
    const { status, priority, updateText } = req.body;
    const { id } = req.params;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      {
        status,
        priority,
        // $push adds the new update to the activity history array
        $push: { updates: { text: updateText, date: new Date() } }
      },
      { new: true } // Returns the document AFTER update
    );

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};