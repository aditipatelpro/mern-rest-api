import { ObjectId } from "mongodb";
import mongoose from "mongoose";

type Goal = {
    user: ObjectId,
    text: string
}

const goalSchema = new mongoose.Schema<Goal>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        }
    }, 
    {
        timestamps: true
    }
)

export const Goal = mongoose.model<Goal>('Goal', goalSchema);
