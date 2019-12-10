const express = require('express');

let {verificarToken} = require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/categorias')

const { verificaToken } = require('../middlewares/autenticacion.js')


app.get('/categoria', verificaToken,(req, res) => {

    console.log(req)
    console.log(res)

})

app.post('/categoria',(req, res) => {

    let body = req.body
    console.log(body)

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: body.usuario
    });

    categoria.save( (err, categoriaDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            categoria:categoriaDB
        });

    })



})

module.exports = app;
