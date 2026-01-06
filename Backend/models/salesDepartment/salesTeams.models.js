import mongoose, {Schema} from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const SalesTeam_Schema = new Schema({
    TLId:{
        type: ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    Members:[{
        MemberId:{
            type: ObjectId,
            ref: "User",
            unique: true
        },
        Status:{
            type: String,
            default: "Active",
        },
        TeamJoiningDate:{
            type: Date,
        }
    }]
});

const SalesTeam_Model = mongoose.model("SalesTeams", SalesTeam_Schema);

export default SalesTeam_Model;