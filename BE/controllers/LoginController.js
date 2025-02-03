const userModel = require("../models/UserModel");
const adminModel = require("../models/AdminModel");
const roleModel = require("../models/RoleModel"); // Import roleModel
const TokenValidation = require('../token/TokenValidation');

const Login = async (req, res) => {
    const { phoneNo, adminUserName, password } = req.body;
    console.log("phoneNo",phoneNo)
    const userLogin = await userModel.findOne({ UserPhoneNo: phoneNo });
    console.log("userLogin",userLogin)
    const adminLogin = await adminModel.findOne({AdminUserName:adminUserName ,AdminPassword:password});
    console.log("adminLogin",adminLogin)

    if (userLogin && !adminLogin) {
        
        const token = TokenValidation.generateToken(userLogin.toObject());
        console.log("loginController-Login -as user-", token);
        res.status(200).json({
            token: token,
            message: "Login Successful",
            success: true
        });
    } else if (!userLogin && adminLogin) {
        const token = TokenValidation.generateToken(adminLogin.toObject());
        console.log("loginController-Login -as admin-", token);
        res.status(200).json({
            token: token,
            message: "Login Successful",
            success: true
        });
    } else if (!userLogin && !adminLogin) {
        console.log("loginController-Login -as none-*******");
        res.status(400).json({
            message: "Registration required",
            success: false
        });
    }
}

const Registration = async (req, res) => {
    const { name,phoneNo } = req.body;
    // console.log("Registration",req.body)
    const userLogin = await userModel.findOne({ UserPhoneNo: phoneNo });
    if (!userLogin) {
        const data={
            UserName:name,
            UserPhoneNo:phoneNo
        }
        const user = new userModel(data);
        const role = await roleModel.findOne({ RoleName: 'User' });

        user.Role = role._id;

        try {

            const userQuery = await user.save();
            if (userQuery) {
                return res.status(200).json({
                    data: userQuery,
                    message: "Registered successfully"
                });
            } else {
                return res.json({
                    message: "Registration failed"
                });
            }
        } catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    } else {
        return res.json({
            message: "Already registered on this Number"
        });
    }
}

module.exports = {
    Login,
    Registration
};
