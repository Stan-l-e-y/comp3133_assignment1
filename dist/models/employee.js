import { Schema, model } from 'mongoose';
const EmployeeSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHER'],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
});
export const Employee = model('Employee', EmployeeSchema);
