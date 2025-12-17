import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Authentication
    firstname: {
      type: String,
      required: true,
      trim: true
    },

    lastname: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["admin", "employee", "manager"],
      default: "employee"
    },

    //  Contact Info
    phone: {
      type: String,
      required: true
    },

    address: {
      type: String
    },

    //  Organization Info
    department: {
      type: String
    },

    reportTo: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "Manager"
  },

    joinDate: {
      type: Date,
      default: Date.now
    },

    //  Bank Details
    bankName: {
      type: String
    },

    ifscCode: {
      type: String
    },

    accountNumber: {
      type: String
    },

    upiId: {
      type: String
    },

    //  Profile
    profileImage: {
      type: String,
      default: ""
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;