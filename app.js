const express = require('express');
const cors = require('cors')
const app = express();

//dotenv configuration
require('dotenv').config();

//db
const db = require('./Config/db')

//middlewares
app.use(express.json());
app.use(cors())
    // models
    // these does not do anything here right now
    // but if we dont include these files then it cannot be synchronized
const teacherModels = require('./Models/Teacher');
const studentModels = require('./Models/Student')

//routes
const registerRoute = require('./Routes/Teacher');



app.use('/teacher', registerRoute);


// connection to the table
db.sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server is listening ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error creating database & tables:', error);
    });