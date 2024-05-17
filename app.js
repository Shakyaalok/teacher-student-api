const express = require('express');
const app = express();

//dotenv configuration
require('dotenv').config();

//db
const db = require('./Config/db')







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