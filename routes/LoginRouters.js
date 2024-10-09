const express = require("express")
const router = express.Router()
const loginController = require("../controllers/LoginController")
router.post("/login",loginController.Login)
router.post("/registration",loginController.Registration)
module.exports = router
