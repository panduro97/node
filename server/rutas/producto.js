const express = require('express');
const _ = require('underscore');

let {verificarToken} = require('../middlewares/autenticacion')

let app = express();

let Producto = require('../models/producto')

const { verificaToken } = require('../middlewares/autenticacion.js')



app.get('/producto',[ verificaToken ],(req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Producto.find({})
            .skip(desde)
            .limit(limite)
            .sort()
            .populate('usuario categoria')
            .exec((err, productos) => {
                
                if(err) {
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }

                if(!productos) {
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }

                res.json({
                    ok:true,
                    productos,
                })

        })
})

app.get('/producto/buscar/:termino',[ verificaToken ],(req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
            .populate('categoria', 'nombre')
            .exec((err, productos) => {
                
                if(err) {
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }

                if(!productos) {
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }

                res.json({
                    ok:true,
                    productos,
                })

        })
})

app.get('/producto/:id', [ verificaToken ], (req, res) => {

    let id = req.params.id 

    Producto.findById(id)
                .populate('usuario categoria')
                .exec((err, producto) => {

                if(err) {
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }

                if(!producto) {
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }

                res.json({
                    ok:true,
                    producto,
                })

            })
        })

app.post('/producto', [ verificaToken ], (req, res) => {

    let body = req.body

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
    });

    console.log(producto);

    producto.save( (err, productoDB) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productoDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            producto:productoDB
        });

    })

})


app.put('/producto/:id', verificaToken , function(req, res) {

    let id = {_id:req.params.id};
    let body = _.pick( req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria']  );

    Producto.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productoDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

            res.json({
                ok:true,
                usuario: productoDB,
            });
        
    })

});

app.delete('/producto/:id', [ verificaToken ], function(req, res) {
    
    let idObjeto =  {
        _id: req.params.id
    }


    Producto.findOneAndUpdate(idObjeto, {disponible:false}, (err, categoriaBD) => {

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
                    message:'el producto no existe'
                }
            })
        }
        
        res.json({
            ok:true,
            message: 'Producto no disponible',
        })

    })

});

module.exports = app;
