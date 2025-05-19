import mongoose from 'mongoose';
// Define Mongoose Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        validate: {
            validator: (val) => !val.includes(' '),
            message: 'Email cannot contain spaces.'
        }
    },
    password: {
        type: String
        // required: true
    },
    accessToken: {
        type: String
        // required: true
    },
    refreshToken: {
        type: String
        // required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, { timestamps: true });
export const userModel = mongoose.model('User', userSchema);
