import { ObjectId } from "mongodb";
import mongoose from "mongoose";

type GoalType = {
    user: ObjectId,
    text: string
}

const goalSchema = new mongoose.Schema<GoalType>(
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

const Goal = mongoose.model<GoalType>('Goal', goalSchema);
export default Goal;