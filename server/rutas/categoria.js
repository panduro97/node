const express = require('express');
const _ = require('underscore');

let {verificarToken} = require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/categorias')

const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autenticacion.js')



app.get('/categoria',[ verificaToken ],(req, res) => {

    Categoria.find({})
            .sort('descripcion')
            .populate('usuario', 'nombre email')
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

app.get('/categoria/:id', [ verificaToken ], (req, res) => {

    let id = req.params.id 

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

app.post('/categoria', [ verificaToken ], (req, res) => {

    let body = req.body

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save( (err, categoriaDB) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB){
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


app.put('/categoria/:id', verificaToken , function(req, res) {

    let id = {_id:req.params.id};
    let body = req.body;

    let desCategoria = {
        descripcion: body.descripcion
    }
    console.log(id)
    console.log(desCategoria)
    Categoria.findOneAndUpdate(id, desCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        console.log(categoriaDB)
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

            res.json({
                ok:true,
                usuario: categoriaDB,
            });
        
    })

});

app.delete('/categoria/:id', [ verificaToken, verificaADMIN_ROLE ], function(req, res) {
    
    let idObjeto =  {
        _id: req.params.id
    }

    Categoria.findOneAndRemove(idObjeto,(err, categoriaBD) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaBD){
            return res.status(400).json({
                ok:false,
                error:{
                    message:'el id no existe'
                }
            })
        }
        
        res.json({
            ok:true,
            message: 'Categoria borrada'
        })

    })

});

module.exports = app;
