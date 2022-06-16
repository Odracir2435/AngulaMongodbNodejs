require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');


const app = express();

app.use(fileUpload());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());

app.use(require("./routes/indexRoutes"))

app.get('/', function (req, res) {
    res.send('Bienvenido API REST');
});

mongoose.connect('mongodb://127.0.0.1:27017/tienda', (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Se conecto");
});

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port ');
});