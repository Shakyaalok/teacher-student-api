const express = require('express');
const { addStudent, allStudent, deleteStudent } = require('../Controllers/Student');
const { auth } = require('../Middleware/auth')
const router = express.Router();

router.use(auth)

router.post('/add', addStudent);
router.get('/all/records', allStudent);
router.delete('/remove/:id', deleteStudent);


module.exports = router;