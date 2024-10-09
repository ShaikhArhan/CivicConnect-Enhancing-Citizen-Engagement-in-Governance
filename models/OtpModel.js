const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    }, 
    otp: {
        type: String,
        required: true
    },
    otpExpiraction: {
        type: Date,
        default: Date.now,
        get: (otpExpiraction) => otpExpiraction.getTime(),
        set: (otpExpiraction) => new Date(otpExpiraction)
    }
});

module.exports= mongoose.model('Otp', otpSchema);