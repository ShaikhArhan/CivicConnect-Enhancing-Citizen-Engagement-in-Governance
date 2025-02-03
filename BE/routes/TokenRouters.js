const express =require('express')
const router = express.Router()
const TokenValidation = require('../token/TokenValidation')
// router.post('/generateTokenUser',TokenValidation.generateTokenUser)
router.post('/validateToken',TokenValidation.validateToken)
module.exports=router;
