import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const client_Schema = new Schema({
    EmployeeIds: [{
        EmployeeId:{type: ObjectId, ref: 'User'},
        ClientStatus:{type: String},
        Date:{type:String}
    }],
    CompanyName: {
        type: String,
    },
    ClientName: {
        type: String,
    },
    Email_Id: {
        type: String,
        unique: true
    },
    Contact_No: {
        type: Number,
        unique: true
    },
    AdderId:{
        type: ObjectId,
        ref: "User"
    },
    AddedBy:{
        type: String
    },
    TeamId:{
        type: ObjectId,
        ref: "SalesTeams"
    },
    CurrentStatus:{
        type: String,
    },
    SalesStatus: {
        type: String
    },
    Comments:[{
        EmployeeId:{type: ObjectId, ref: 'User'},
        Date: {
            type: String,
            required: true
        },
        Time: {
            type: String,
            required: true
        },
        Comment:{
            type: String,
            required: true
        }
    }],
    LastUpdate_Date: {
        type: Date,
    },
    Reminder_Date: {
        type: Date,
        required: true
    },
    ClientType:{
        type: String,
    },
    AddDate:{
        type: Date,
        required: true
    }
});

const client_Model = mongoose.model("Client", client_Schema);

export default client_Model;