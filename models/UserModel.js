const mongoose = require('mongoose')

const generateObjectId = () => new mongoose.Types.ObjectId();

const Schema = mongoose.Schema
const userSchema = new Schema({
    Role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    },
    UserID: {
        type: Schema.Types.ObjectId,
        default: generateObjectId
    },
    UserName: {
        type: String,
        required: true
    },
    UserPhoneNo: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)