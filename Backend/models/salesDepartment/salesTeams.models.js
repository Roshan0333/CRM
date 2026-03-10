import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const SalesTeam_Schema = new Schema({
    ManagerId: {
        type: ObjectId,
        ref: "User"
    },
    TLId: {
        type: ObjectId,
        ref: "User"
    },
    TLStatus: {
        type: String,
        default: "Active"
    },
    TLName: {
        type: String,
    },
    TLContact_No: {
        type: String,
        required: true,
    },
    TLEmail_Id: {
        type: String,
        required: true,
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
        },
        Status: {
            type: String,
            default: "Active",
        },
        Name: {
            type: String,
        },
        Contact_No: {
            type: String,
            required: true,
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

SalesTeam_Schema.index({ ManagerId: 1 })
SalesTeam_Schema.index({ TLEmail_Id: 1 })
SalesTeam_Schema.index({ TLId: 1 });
SalesTeam_Schema.index({ ManagerId: 1, TLId: 1, TLEmail_Id: 1 });
SalesTeam_Schema.index({ "Members.Email_Id": 1 })
SalesTeam_Schema.index(
    { "Members.MemberId": 1 },
    { sparse: true }
);

const SalesTeam_Model = mongoose.model("SalesTeams", SalesTeam_Schema);

export default SalesTeam_Model;