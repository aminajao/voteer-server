const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/create-password', userController.generateUserPassword);


module.exports = router;