require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json

app.use(bodyParser.json())

// Configuracion de rutas
app.use( express.static(path.resolve( __dirname, '../public')));


app.use( require('./rutas/index.js'))


mongoose.connect(process.env.URLDB ,(err,res) => {
    if(err) throw err;
    console.log('base de datos;')
});

/* mongoose.connect('mongodb://localhost:27017/cafe', (err,res) => {

    if( err ) throw err;  

    console.log(' base de datos');

}); */



app.listen(process.env.PORT, (err, res) => {
    if(err) throw err;
    console.log(process.env.PORT);

});