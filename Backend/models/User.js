// Backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    bankName:  { type: String, required: true },
    ifsc:      { type: String, required: true },
    bankAccount: { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    department:{ type: String, required: true },
    role:      { type: String, required: true },
      // 🔥 ADD / CONFIRM THESE
    contact: {type: String,   },
    location: {
      type: String,   // address
    },
    upiId: {
      type: String,
    },
    joiningDate: {
     type: Date,
    },
  },
  { timestamps: true }
);

userSchema.index({department: 1});
userSchema.index({role:1});
userSchema.index({ department: 1, role: 1 });

const User = mongoose.model("User", userSchema);
export default User;
