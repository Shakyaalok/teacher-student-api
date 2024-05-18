const express = require('express');
const { teacherRegister } = require('../Controllers/Teacher');
const router = express.Router();



router.post('/register', teacherRegister);


module.exports = router;