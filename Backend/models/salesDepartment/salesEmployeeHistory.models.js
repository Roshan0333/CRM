import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const employee_Schema = new Schema({
    EmployeeId: {
        type: ObjectId,
        ref: "User"
    },
    ClientHandleHistory: [{
        year: {
            type: String
        },
        months: [{
            month: {
                type: String
            },
            day: [{
                date: {
                    type: String
                },
                ClientId: [{
                    type: ObjectId,
                    ref: "Client"
                }]
            }]
        }]
    }]
})

const employee_Model = mongoose.model("Sales_Employee_History", employee_Schema);

export default employee_Model