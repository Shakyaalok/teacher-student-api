const Register = require('../Models/Teacher');
const bcrypt = require('bcrypt');

const teacherRegister = async(req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(500).json({ message: 'Fields cannot be empty' })
        }


        let teacher = await Register.findOne({ where: { email: email } });
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

                teacher = await Register.create(data);
                res.status(201).json({ teacher, message: 'Register Successfull' })
            }
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error, message: 'something went wrong' })
    }

}


module.exports = { teacherRegister }