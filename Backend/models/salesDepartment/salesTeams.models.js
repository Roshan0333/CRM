import mongoose, {Schema} from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const SalesTeam_Schema = new Schema({
    SalesManagerId:{
        type: ObjectId,
        ref: "User",
        required: true
    },
    TLId:{
        type: ObjectId,
        ref: "User",
        required: true
    },
    // SalesExecutiveId:{
    //     type: ObjectId,
    //     ref: "User",
    //     required: true
    // },
    Members:[{
        MemberId:{
            type: ObjectId,
            ref: "User",
            required: "User"
        },
        Status:{
            type: String,
            default: "Active",
        }
    }]
});

const SalesTeam_Model = mongoose.model("SalesTeams", SalesTeam_Schema);

export default SalesTeam_Model;