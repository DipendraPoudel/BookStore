const express = require('express');
const authController = require('../controllers/authcontroller');
const router = express.Router()




router.post('/signup', authController.Signup);
router.post('/authenticate', authController.Authenticate);



module.exports = router;

