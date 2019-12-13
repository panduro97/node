const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use( fileUpload({ useTempFiles: true }) );

app.put('/upload/:tipo/:id', function( req, res) {

    let tipo = req.params.tipo
    let id = req.params.id

    if(!req.files){
        return res.status(400)
        .json({
            ok: false,
            err: {
                message: 'No se a seleccionado ningun archivo.'
            }
        })
    }

    let tiposValidos = ['productos', 'usuarios'];

    if( tiposValidos.indexOf( tipo ) < 0 ) {
        return res.status(400).json({
            ok:false,
            err: {
                message: 'Los tipos permitidos son '+ tiposValidos.join(', ')
            }
        })
    }

    let archivo = req.files.archivo;

    let nombreCortado = archivo.name.split('.');

    let extension = nombreCortado[nombreCortado.length - 1];

    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if( extensionesValidas.indexOf( extension ) < 0 ){
        return res.status(400).json({
            ok:false,
            err: {
                message: 'Las extensiones permitidas son '+ extensionesValidas.join(', '),
                ext: extension
            }
        })
    }

    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension }`

    archivo.mv(`uploads/${tipo}/${ nombreArchivo }.jpg`, (err) => {

        if(err){
            return res.status(500)
            .json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            message:'Imagen subida correctamente'
        })

    })

})

module.exports = app;