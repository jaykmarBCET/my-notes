import mongoose from 'mongoose'


const SubjectSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true})

const Subject = mongoose.models.Subject || mongoose.model("Subject",SubjectSchema)

export {Subject}