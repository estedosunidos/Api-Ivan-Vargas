import mongoose, { Schema } from "mongoose";


const PlatformSchema = new mongoose.Schema({

  
    title:{
        type:String,
      },
    createdAt:{
        type:Date,
        default: Date.now
        
    },
    updatedAt:{
        type:Date,
        default: Date.now
        
    },
})
export const PlatformwModel = mongoose.model('Platform',PlatformSchema)