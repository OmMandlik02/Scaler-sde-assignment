const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors())
app.use(express.urlencoded());
app.use(express.json());
const mongoose = require('./config/mongoose')


app.use('/', require('./router/index'))

app.listen(8000, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is running at port ${port}`);
})