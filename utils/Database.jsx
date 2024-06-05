
import mongoose from "mongoose";

let isConnected = false;

export const connectDB =  async ()=>{
    if(isConnected){
        console.log("Mongo Db is already  connected");
    }else{
       mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Database connected successfully');
        isConnected = true;
        

       }).catch((err)=>{
        console.log("error occured while trying to connect to DB");
        console.log(err);
       })
    }
}