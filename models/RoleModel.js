const mongoose = require('mongoose')

const generateObjectId = () => new mongoose.Types.ObjectId();

const Schema = mongoose.Schema
const roleSchema =new Schema({
    RoleID:{
        type: Schema.Types.ObjectId,
        default: generateObjectId,
    },
    RoleName:{
        type:Schema.Types.ObjectId
    },
    RolePermission:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.model("Role",roleSchema)