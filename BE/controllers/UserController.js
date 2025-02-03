const { json } = require('express');
const userModel = require('../models/UserModel')
const roleModel = require('../models/RoleModel');
const TokenValidation = require('../token/TokenValidation');
// const LocalStorage = require('../util/LocalStorage');


const addUser = async (req, res) => {
    const user = new userModel(req.body)
    const role = await roleModel.findOne({ RoleName: 'User' })
    user.Role = role._id;
    // const role = await userModel.findOne({Role:})

    try {

        const userQuery = await user.save();

        if (userQuery) {

            const token = TokenValidation.generateToken(user.toObject());            
            console.log("UserController-addUser -",token)

            return res.status(200).json({
                token: token,
                message: "user added successfully"
            })

        }
        else {
            return res.json({
                message: "user not added"
            })
        }
    }
    catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

const getAllUser = async (req, res) => {
    try {

        // const userQuery = await userModel.find().populate("Role").lean()
        const userQuery = await userModel.find().populate("Role")

        // const modifiedUser = userQuery.map(user => {
        //     // const { Role: { RolePermission, ...restRole }, ...restUser } = user;
        //     return {
        //         ...user, UserID: user._id, _id: undefined
        //         // ...restUser,Role: { ...restRole }
        //     }
        // })

        if (userQuery) {
            res.status(200).json({
                data: userQuery,
                message: "user fatched successfully"
            })
        }
        else  {
            res.json({
                message: "users not found or empty list"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getUserById = async (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    try {
        // Create a query object dynamically
        const query = {};
        query[key] = value;
        // console.log("value",value)
        // console.log("key",key)
        // console.log("query",query)

        const userQuery = await userModel.findOne(query).populate("Role");

        if (userQuery) {
            res.status(200).json({
                data: userQuery,
                message: 'User details fetched successfully',
                success:true
            });
        } else if(!userQuery) {
            res.json({
                message: 'User not found',
                success:false
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteUser = async (req, res) => {

    var id = req.params.id

    try {

        const userQuery = await userModel.findByIdAndDelete(id)

        if (userQuery) {
            res.status(200).json({
                data: userQuery,
                message: "user deleted successfully"
            })
        }
        else {
            req.json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const updateUser = async (req, res) => {

    const id = req.params.id

    const data = {
        // RoleID: req.body.RoleID,
        UserName: req.body.UserName,
        UserPhoneNo: req.body.UserPhoneNo,
        // UserAddress: req.body.UserAddress
    }

    try {

        // const userQuery = await userModel.findByIdAndUpdate(id, data).lean()
        const userQuery = await userModel.findByIdAndUpdate(id, data)

        if (userQuery) {
            // const modifiedUser = {

            //     ...userQuery, UserID: userQuery._id, _id: undefined
            // }
            res.status(200).json({
                data: userQuery,
                message: "user updateed successfully"
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    addUser,
    getAllUser,
    getUserById,
    deleteUser,
    updateUser
}