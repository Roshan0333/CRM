import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const Sales_Schema = new Schema({
    ClientId: {
        type: ObjectId,
        ref: "Client",
        required: true,
        unique : true
    },
    Date: {
        type: String,
        required: true
    },
    SalerId:{
        type: ObjectId,
        ref: "User"
    },
    TeamLeaderId: {
        type: ObjectId,
        ref: "User"
    },
    SalesExecutiveId: {
        type: ObjectId,
        ref: "User"
    },
    Service: {
        type: String,
        required: true
    }, 
    Amount: {
        type: Number,
        required: true
    },
    Activities: [{
        Date: {
            type: String,
        },
        Activity: {
            type: String,
        }
    }]
})

const Sales_Model = mongoose.model("Sales", Sales_Schema);

export default Sales_Model;