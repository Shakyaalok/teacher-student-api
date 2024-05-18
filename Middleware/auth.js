const Teacher = require("../Models/Teacher");
const jwt = require("jsonwebtoken");

const auth = async(req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(500).json({ message: "token is missing" });
    }
    const decodecToken = jwt.verify(token, process.env.SECRET_KEY);

    if (decodecToken.teacherId) {
        await Teacher.findByPk({ where: { id: decodecToken.teacherId } }).then(
            (teacher) => {
                req.teacher = teacher;
                next();
            }
        );
    }
};

module.exports = { auth };