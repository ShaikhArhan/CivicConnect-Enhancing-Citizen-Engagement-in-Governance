const OtpModel = require('../models/OtpModel');
const twilio = require('twilio');
const { TOTP } = require('totp-generator');

const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const data = TOTP.generate("JBSWY3DPEHPK3PXP", { period: 120 });
        const otpValue = data.otp.toString();
        const cDate = new Date();
        
        await OtpModel.findOneAndUpdate(
            { phoneNumber: phoneNumber },
            { otp: otpValue, otpExpiraction: new Date(cDate.getTime() + (60 * 1000)) }, // Assuming OTP expiration time of 60 seconds
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        
        console.log("OtpController " +phoneNumber)
        await twilioClient.messages.create({
            body: `Your OTP ${otpValue} is for verification. Do not share it with anyone.`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

const verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        console.log("verifyOtp",phoneNumber,otp);

        const otpData = await OtpModel.findOne({ phoneNumber: phoneNumber, otp: otp });

        if (!otpData) {
            return res.status(400).json({
                success: false,
                message: "Entered wrong OTP!"
            });
        }

        const currentDateTime = new Date();
        if (currentDateTime > otpData.otpExpiraction) {
            return res.status(400).json({
                success: false,
                message: "OTP expired!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
    } catch (err) {
        console.log("Error in verifyOtp : " + err.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = { sendOtp, verifyOtp };
