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
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: true
    }
});
export const User = model('User', UserSchema);
