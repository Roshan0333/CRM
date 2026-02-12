import mongoose, { mongo } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },

    invoiceNo: {
      type: String,
      required: true,
      unique: true
    },

    clientName: String,
    designation: String,
    contactNo: String,
    email: String,

    serviceName: {
      type: String,
      required: true
    },
    totalAmount:{
      type:number,
      required:true
    },

    startDate: Date,
    endDate: Date,

    status: {
      type: String,
      enum: ["upcoming", "pending", "completed"],
      default: "upcoming"
    },

    deadline:{
      type:Date,
      deafult:null
    },

    assignedTL: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },

    assignedEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    services: [
      {
        name: String,
        fileUrl: String,
        uploaded: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: true }
);

const project = mongoose.model("project",projectSchema)

export default project
