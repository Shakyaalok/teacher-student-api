const express = require('express');
const app = express();

//dotenv configuration
require('dotenv').config();



app.listen(process.env.PORT, () => {
    console.log(`server is listening ${process.env.PORT}`)
})