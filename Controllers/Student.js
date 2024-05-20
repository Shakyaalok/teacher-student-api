const Student = require('../Models/Student');
const { Op } = require('sequelize');

//student added
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

//student fetch;
const allStudent = async(req, res) => {
    const { query } = req.query;
    try {
        let where = {};
        if (query) {
            where = {
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        }
        const students = await Student.findAll({ where });
        if (!students) {
            return res.status(404).json({ message: 'No Record found' })
        }

        res.status(200).json({ data: students, message: 'All Records fetched' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
}

//delete student
const deleteStudent = async(req, res) => {
    const { id } = req.params
    try {
        const isExist = await Student.findOne({ where: { id: id } });
        if (!isExist) {
            return res.status(404).json({ message: 'No student found' })
        }
        await Student.destroy({ where: { id: id } });
        res.status(200).json({ message: 'delete Suceefully' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }

}



module.exports = { addStudent, allStudent, deleteStudent }