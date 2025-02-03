const mongoose = require('mongoose')

const generateObjectId = () => new mongoose.Types.ObjectId();

const Schema = mongoose.Schema
const adminSchema =new Schema({
    AdminRole:{
        type:Schema.Types.ObjectId,
        ref:"Role"
    },
    AdminID:{
        type: Schema.Types.ObjectId, 
        default: generateObjectId,
    },
    AdminName:{
        type:String,
        required: true
    },
    AdminPhoneNo:{
        type:String,
        required: true
    },
    AdminUserName:{
        type:String,
        required: true
    },
    AdminPassword:{
        type:String,
        required: true
    },
    AdminAddress:{
        type:String,
        required: true
    }
})

module.exports=mongoose.model("Admin",adminSchema)
