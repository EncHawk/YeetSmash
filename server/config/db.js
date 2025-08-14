import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
function connectDB(){
  mongoose.connect(process.env.DATABASE_URL, {});
  const db = mongoose.connection;
  db.on('error' , (error)=>{console.error(error);});
  db.once('open', ()=>{console.log('connected to mongoose')})
}

export default connectDB;