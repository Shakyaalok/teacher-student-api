const express = require('express');
const { addStudent } = require('../Controllers/Student');
const { auth } = require('../Middleware/auth')
const router = express.Router();

router.use(auth)

router.post('/add', addStudent);


module.exports = router;