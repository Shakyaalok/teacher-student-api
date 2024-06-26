const { raw } = require('mysql2');
const Teacher = require('../Models/Teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//Registration
const teacherRegister = async(req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(500).json({ message: 'Fields cannot be empty' })
        }


        let teacher = await Teacher.findOne({ where: { email: email } });
        if (teacher) {
            return res.status(500).json({ message: 'User Already exists' });
        }

        //password-protected
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async function(err, hashpassword) {
            if (!err) {
                const data = {
                    name: name,
                    email: email,
                    password: hashpassword
                }

                teacher = await Teacher.create(data);
                res.status(201).json({ data: teacher, message: 'Register Successfull' })
            }
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error, message: 'something went wrong' })
    }

}

//Login 
//passowrd compare and generate a token
const teacherLogin = async(req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(500).json({ message: 'Fields cannot be empty' });
        }

        let teacher = await Teacher.findOne({ where: { email }, raw: true });
        if (!teacher) {
            return res.status(404).json({ message: 'User not registered' });
        }

        let match = await bcrypt.compare(password, teacher.password);
        if (!match) {
            return res.status(500).json({ message: 'Check your credentails' });
        }

        // doing : because this password variable exists already so we did -password: pwd
        const { password: pwd, ...updatedData } = teacher

        //token created while the user login
        console.log('id', teacher.id)
        const token = generateToken(teacher.id);


        res.status(200).json({ data: updatedData, token, message: 'Login Successfull!' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', error });
    }
}

const generateToken = (teacherId) => {
    return jwt.sign({ teacherId: teacherId }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

module.exports = { teacherRegister, teacherLogin }