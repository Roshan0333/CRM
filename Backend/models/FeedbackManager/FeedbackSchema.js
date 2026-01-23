import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  token: { 
    type: String, 
    required: true, 
    unique: true 
  },
  companyName: { 
    type: String, 
    required: true 
  },
  clientName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  designation: { 
    type: String, 
    required: false,
    default: "Executive" 
  },
  invoiceNo: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  },
  services: [{
    name: { 
      type: String, 
      required: true 
    },
    adminMessage: { 
      type: String, 
      default: "" 
    },
    videoLink: {   
      type: String, 
      default: "" 
    },
    rating: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5
    },
    fileUrl: { 
      type: String, 
      default: "" 
    }
  }],
  clientComment: { 
    type: String, 
    default: "" 
  },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;