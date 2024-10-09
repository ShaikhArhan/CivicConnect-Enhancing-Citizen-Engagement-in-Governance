const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post('/addUser', UserController.addUser);
router.get('/getAllUser', UserController.getAllUser);
router.get('/getUserById/:key/:value', UserController.getUserById);
router.delete('/deleteUser/:id', UserController.deleteUser);
router.put('/updateUser/:id', UserController.updateUser);

module.exports = router;
