const Student = require('../Models/Student');

const addStudent = async(req, res) => {
    const { name, marks, subject } = req.body;

    if (!name || !marks || !subject) {
        return res.status(500).json({ message: 'all fields cannot empty' })
    }

    const data = {
        name: name,
        marks: marks,
        subject: subject
    }

    const student = await Student.create(data);
    res.status(201).json({ data: student, message: 'Added Successfully!' })
}

module.exports = { addStudent }