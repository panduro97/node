const express = require('express');

let {verificarToken} = require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/categorias')

const { verificaToken } = require('../middlewares/autenticacion.js')


app.get('/categoria',(req, res) => {
    console.log('alo');
    Categoria.find()
            .exec((err, categorias) => {
                
                if(err) {
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }


                res.json({
                    ok:true,
                    categorias,
                })

            })
})

app.get('/categorias/:id ', (req, res) => {

    let id = req.params.id
    console.log(id);
    Categoria.findById(id, (err,categorias) => {

                if(err) {
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }

                res.json({
                    ok:true,
                    categorias,
                })

            })
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
