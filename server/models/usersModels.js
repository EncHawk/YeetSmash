import mongoose, { Model, Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config('../.env');
console.log(process.env.NODE_ENV);
// we create new schema for another model
const userWaitlistSchema = mongoose.Schema({
  name:{
    type: String,
    required : true,
    maxLength: 25
  },
  email:{
    type: String,
    required: true,
    unique: true
  }
});

const userW = new mongoose.model('UsersW', userWaitlistSchema);

export default userW;