import mongoose from "mongoose";


const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        enum: ["Management TL", "Management Employee"],
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Inactive"
    },

    contact: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountNo: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    upiId: {
        type: String,
        required: true,
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
})

const Team = mongoose.model("Team", TeamSchema)
export default Team