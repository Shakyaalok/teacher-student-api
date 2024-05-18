const Student = require('../Models/Student');
const { Op } = require('sequelize');


const addStudent = async(req, res) => {
    const { name, marks, subject } = req.body;

    try {
        if (!name || !marks || !subject) {
            return res.status(500).json({ message: 'fields cannot empty' })
        }

        const data = {
            name: name,
            marks: marks,
            subject: subject
        }
        const isExist = await Student.findOne({
            where: {
                [Op.and]: [{ name, subject }]
            }
        })
        if (isExist) {
            await Student.update({ marks }, { where: { id: isExist.id } });
            const updatedStudentMarks = await Student.findOne({ where: { id: isExist.id } });
            return res.status(201).json({ data: updatedStudentMarks, message: 'marks updated succefully!' })
        }

        const student = await Student.create(data);
        res.status(201).json({ data: student, message: 'Added Successfully!' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { addStudent }