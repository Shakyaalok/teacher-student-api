const Sequelize = require('sequelize');
const sequelize = require('../Config/db');

const student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})


module.exports = student;