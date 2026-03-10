import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
  name: 
  { type: String,
    required: true 
},
  email_id: 
  { type: String, 
    required: true, 
    unique: true 
},
  position: 
  { 
    type: String 
  },
  contact_no: 
  { 
    type: String 
},
  location: 
  { 
    type: String 
},
  bank_name: 
  { 
    type: String 
},
  account_no: 
  {
     type: String 
    },
  ifsc_code: 
  { 
    type: String 
},
  upi_id: 
  { 
    type: String 
},
  joining_date: 
  { 
    type: String 
},
  status: 
  {
     type: String, default: "Active" 
    },
  managerId: 
  { 
    type: mongoose.Schema.Types.ObjectId, ref: "User" 
} 
}, { timestamps: true });

const TeamMember = mongoose.model("TeamMember", TeamMemberSchema);
export default TeamMember;