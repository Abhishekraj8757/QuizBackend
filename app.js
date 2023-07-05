const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const ErrorHandler = require('./middlewares/errorHandler');


app.get('/',(req,res,next) => {
    res.status(200).json({
        status : 200,
        message : "Project set up done"
    })
})

app.use(ErrorHandler);

app.use((req,res,next) => {
    res.status(500).send('Something went wrong!');
})



app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log(`Server is listening on port ${process.env.PORT}`))
     .catch((error) => console.log(error))
})