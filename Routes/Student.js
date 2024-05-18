const express = require('express');
const { addStudent, allStudent } = require('../Controllers/Student');
const { auth } = require('../Middleware/auth')
const router = express.Router();

router.use(auth)

router.post('/add', addStudent);
router.get('/all/records', allStudent)


module.exports = router;