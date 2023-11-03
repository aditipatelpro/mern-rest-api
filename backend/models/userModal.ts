import mongoose from 'mongoose';

type UserTpye = {
  name: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<UserTpye>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserTpye>('User', userSchema);
export default User;
