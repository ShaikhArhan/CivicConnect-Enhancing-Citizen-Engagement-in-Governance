const mongoose = require('mongoose')

const generateObjectId = () => new mongoose.Types.ObjectId();

const Schema = mongoose.Schema
const problemSchema =new Schema({
    ProblemID:{
        type: Schema.Types.ObjectId,
        default: generateObjectId,
    },
    UserID:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    ProblemImage:{
        type:String,
        required: true
    },
    ProblemDescription:{
        type:String,
        required: true
    },
    ProblemLocation:{
        type:String,
        required: true
    },
    Status:{
        type:Array,
        required:true
        
    },
    UploadTime:{
        type:Date,
        required:true
    }
})

module.exports=mongoose.model("Problem",problemSchema)