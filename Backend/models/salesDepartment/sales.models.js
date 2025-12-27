import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const Sales_Schema = new Schema({
    ClientId: {
        type: ObjectId,
        ref: "Client",
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    TeamLeaderId: {
        type: Object,
        ref: "User",
        required: true
    },
    SalesExecutiveId: {
        type: Object,
        ref: "User",
        required: true
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