const express= require('express')
const router=express.Router()
const adminController = require("../controllers/AdminController")
router.post("/addAdmin",adminController.addAdmin)
router.get("/getAllAdmin",adminController.getAllAdmin)
router.get("/getAdminByAny/:key/:value",adminController.getAdminByAny)
router.delete("/deleteAdmin/:id",adminController.deleteAdmin)
router.put("/updateAdmin/:id",adminController.updateAdmin)
module.exports=router