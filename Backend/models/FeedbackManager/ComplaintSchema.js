import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
companyName: { type: String, required: true },
  subject: { type: String, required: true },
  email_id: { type: String, required: true },
  issuedDate: { type: Date, default: Date.now },
  discussion: { type: String }, // For the "View" activity
  status: { 
    type: String, 
    enum: ['Solved', 'Unsolved'], 
    default: 'Unsolved' 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Low' 
  },
  updates: [{
    text: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true })

const Complaint = mongoose.model ('Complaint', ComplaintSchema);
export default Complaint;