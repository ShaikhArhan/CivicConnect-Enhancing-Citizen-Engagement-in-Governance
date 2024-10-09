const adminModule = require('../models/AdminModel')
const roleModule = require('../models/RoleModel')

const addAdmin = async (req, res) => {
    const data = {
        AdminRole: req.body.roleId,
        AdminName: req.body.name,
        AdminPhoneNo: req.body.phoneNumber,
        AdminUserName: req.body.username,
        AdminPassword: req.body.password,
        AdminAddress: req.body.address
    };
    console.log("adtest1", data);

    try {
        const adminPresent = await adminModule.find({
            $or: [{ AdminPhoneNo: data.AdminPhoneNo },
            { AdminUserName: data.AdminUserName },
            { AdminPassword: data.AdminPassword }]
        });
        console.log("adtest2", adminPresent);

        if (adminPresent && adminPresent.length === 0) {
            console.log("adtest3");

            const newAdmin = new adminModule(data);
            const adminQuery = await newAdmin.save();
            console.log("adtest4");

            if (adminQuery) {
                console.log("adtest5");

                res.status(200).json({
                    data: adminQuery,
                    message: "Admin register successfully"
                });
            } else {
                console.log("adtest6");

                await roleModule.findByIdAndDelete(data.AdminRole)
                res.json({
                    message: "Admin not Register"
                });
            }
        } else {
            console.log("adtest7");

            await roleModule.findByIdAndDelete(data.AdminRole)
            res.json({
                message: "Please use different 'Phone Number' or 'Username' or 'Password'"
            });
        }
    } catch (err) {
        console.log("adtest8");

        await roleModule.findByIdAndDelete(data.AdminRole)
        res.status(500).json({
            message: err.message
        });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        
        // const adminQuery = await adminModule.find().populate("RoleID").lean()
        const adminQuery = await adminModule.find().populate("AdminRole")

        if (adminQuery) {
            res.status(200).json({
                data: adminQuery,
                message: "admin fatched successfully"
            })
        }
        else {
            res.json({
                message: "admins not found or empty list"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getAdminByAny = async (req, res) => {

    const key = req.params.key;
    const value = req.params.value;
    const query = {}
    query[key] = value

    console.log("key", key)
    console.log("value", value)
    console.log("query", query)
    try {

        // const adminQuery = await adminModule.findById(id).populate("Role").lean()
        const adminQuery = await adminModule.find(query).populate("AdminRole")
        console.log("adminQuery", adminQuery)
        if (adminQuery) {
            // const modifiedAdmin = {
            //     ...adminQuery, AdminID: adminQuery._id, _id: undefined
            // }
            console.log("adminQuery", adminQuery)
            res.status(200).json({
                data: adminQuery,
                message: 'admin details fatched successfully',
                success: true
            })
        }
        else {
            res.json({
                message: "admin not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteAdmin = async (req, res) => {

    const id = req.params.id

    try {

        const adminQuery = await adminModule.findByIdAndDelete(id)

        if (adminQuery) {
            res.status(200).json({
                data: adminQuery,
                message: "Deleted Successfully"
            })
        }
        else {
            res.json({
                message: "admin not found",
                success:false
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const updateAdmin = async (req, res) => {

    const id = req.params.id;
    const data = {
        AdminName: req.body.AdminName,
        AdminUserName: req.body.AdminUserName,
        AdminPassword: req.body.AdminPassword,
        AdminPhoneNo: req.body.AdminPhoneNo,
        AdminAddress: req.body.AdminAddress
    };
console.log("up1",id,data);

    try {
        // Check if another admin with the same username, phone number, or password exists
        const adminPresent = await adminModule.findOne({
            $or: [
                { AdminUserName: data.AdminUserName },
                { AdminPhoneNo: data.AdminPhoneNo },
                { AdminPassword: data.AdminPassword }
            ],
            _id: { $ne: id }
        });

        console.log("up2", adminPresent);

        if (!adminPresent) {
            // No conflict found, update the admin
            const adminQuery = await adminModule.findByIdAndUpdate(id, data, { new: true });
            console.log("up3", adminQuery);

            if (adminQuery) {
            console.log("up4");

                res.status(200).json({
                    data: adminQuery,
                    message: 'Admin Updated Successfully',
                    success: true
                });
            } else {
            console.log("up5");

                res.json({
                    message: "Admin not found",
                    success: false
                });
            }
        } else {
            console.log("up6");

            res.json({
                message: "Please use a different 'Phone Number', 'Username', or 'Password'",
                success: false
            });
        }
    } catch (err) {
        console.log("up7");

        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    addAdmin,
    getAllAdmin,
    deleteAdmin,
    getAdminByAny,
    updateAdmin
}