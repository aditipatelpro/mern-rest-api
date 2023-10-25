import mongoose from "mongoose";

type User = {
    name: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
},
    {
        timestamps: true
    })

export const User = mongoose.model<User>('User', userSchema);