require('./config/config');

const mongoose = require('mongoose');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use( require('./rutas/usuario.js'))



mongoose.connect('mongodb://localhost:27017/cafe', () => {
    useNewUrlParser: true
    console.log('base de datos;')
});

/* mongoose.connect('mongodb://localhost:27017/cafe', (err,res) => {

    if( err ) throw err;  

    console.log(' base de datos');

}); */



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});