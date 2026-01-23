import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const SalesTeam_Schema = new Schema({
    TLId: {
        type: ObjectId,
        ref: "User",
        unique: true
    },
    TLStatus:{
        type: String,
        default: "Active"
    },
    TLName: {
        type: String,
    },
    TLContact_No: {
        type: Number,
        required: true,
        unique: true,
    },
    TLEmail_Id: {
        type: String,
        required: true,
        unique: true
    },
    TLLocation: {
        type: String,
        required: true
    },
    TLJoiningDate: {
        type: Date,
    },
    Members: [{
        MemberId: {
            type: ObjectId,
            ref: "User",
            unique: true
        },
        Status: {
            type: String,
            default: "Active",
        },
        Name: {
            type: String,
        },
        Contact_No: {
            type: Number,
            required: true,
            unique: true
        },
        Email_Id: {
            type: String,
            required: true
        },
        Location: {
            type: String,
            required: true
        },
        TeamJoiningDate: {
            type: Date,
        },
    }]
});

const SalesTeam_Model = mongoose.model("SalesTeams", SalesTeam_Schema);

export default SalesTeam_Model;