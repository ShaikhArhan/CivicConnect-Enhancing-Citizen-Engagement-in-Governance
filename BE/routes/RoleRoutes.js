const express = require("express")
const router = express.Router()
const RoleController = require("../controllers/RoleController")
router.post('/addRole', RoleController.addRole)
router.get('/getAllRole', RoleController.getAllRole)
router.get('/getRoleById/:id', RoleController.getRoleById)
router.delete('/deleteRole/:id', RoleController.deleteRole)
router.put('/updateRole/:id', RoleController.updateRole)
module.exports = router