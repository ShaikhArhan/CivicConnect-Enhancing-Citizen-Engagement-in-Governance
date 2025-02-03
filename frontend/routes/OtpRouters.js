const express = require('express')
require('dotenv').config()

const router=express.Router()
const userController = require('../controllers/OtpController')

router.use(express.json())

router.post('/sendOtp',userController.sendOtp)
router.post('/verifyOtp',userController.verifyOtp)
module.exports = router