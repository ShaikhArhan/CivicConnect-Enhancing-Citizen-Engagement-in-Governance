const roleModel = require('../models/RoleModel')

const addRole = async (req, res) => {
    console.log("test1");

    const { RoleName, RolePermission } = req.body
    console.log("test2", RoleName, RolePermission);

    const data = {
        RoleName: RoleName,
        RolePermission: RolePermission
    }
    console.log("test3");

    const role = new roleModel(data)
    console.log("test4");

    try {
        const roleQuery = await role.save();
        console.log("test5");

        if (roleQuery) {
            res.status(200).json({
                data: role,
                message: "role added successfully"
            })
        }
    }
    catch (err) {
        console.log("test6");

        res.status(500).json({
            message: err.message
        })
    }
}
const getAllRole = async (req, res) => {
    try {

        // const roleQuery = await roleModel.find().lean()
        const roleQuery = await roleModel.find()

        // const modifiedRole = roleQuery.map(role => {
        //     return {
        //         ...role, RoleID: role._id, _id: undefined
        //     }
        // })
        if (roleQuery) {
            res.status(200).json({
                data: roleQuery,
                message: "roles fatched successfully"
            })
        }
        else {
            res.json({
                message: "roles not found or empty list"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
const getRoleById = async (req, res) => {

    const id = req.params.id
    console.log("id", id)

    try {

        // const roleQuery = await roleModel.findById(id).lean()
        const roleQuery = await roleModel.findById(id)

        if (roleQuery) {
            // const modifiedRole = {
            //     ...roleQuery, RoleID: roleQuery._id, _id: undefined
            // }
            res.status(200).json({
                data: roleQuery,
                message: 'role details fatched successfully'
            })
        }
        else {
            res.json({
                message: 'role no found'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
const updateRole = async (req, res) => {

    const id = req.params.id
    console.log("upr1", id);

    const data = {
        RoleName: req.body.RoleName,
        RolePermission: req.body.RolePermission
    }
    console.log("upr2", data);
    try {

        // const roleQuery = await roleModel.findByIdAndUpdate(id, data).lean()
        const roleQuery = await roleModel.findByIdAndUpdate(id, data)

        console.log("upr3", roleQuery);
        if (roleQuery) {
            console.log("upr4");
            // const modifiedRole = {
            //     ...roleQuery, RoleID: roleQuery._id, _id: undefined
            // }
            res.status(200).json({
                data: roleQuery,
                message: 'role updated successfully',
                success: true
            })
        }
        else {
            console.log("upr5");
            res.json({
                message: 'role no found',
                success: false
            })
        }
    }
    catch (err) {
        console.log("upr6");
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteRole = async (req, res) => {
    const id = req.params.id
    try {
        const roleQuery = await roleModel.findByIdAndDelete(id)

        if (roleQuery) {

            res.status(200).json({
                data: roleQuery,
                message: 'role deleted successfully'
            })
        }
        else {
            res.json({
                message: 'role no found'
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
    addRole,
    getAllRole,
    getRoleById,
    updateRole,
    deleteRole
}