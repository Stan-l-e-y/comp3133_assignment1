import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return /^[\w\-\.]+@([\w-]+\.)+[\w-]+$/.test(email);
            }
        },
    },
    password: {
        type: String,
        required: true
    }
});
export const User = model('User', UserSchema);
