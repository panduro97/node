const jwt = require('jsonwebtoken');

// ============================
//  verificacion token
// ============================

let verificaToken = (req, res, next) => {

    let token = req.get('token');
  
    jwt.verify( token, process.env.SEED, ( err, decoded) => {

        if( err){
            return res.status(401).json({
                ok:false, 
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next(); 
     }); 
}

// ============================
//  verificacion ADMIN_ROLE
// ============================

let verificaADMIN_ROLE = (req, res, next) => {

    let usuario = req.usuario;

    if(usuario.role != 'ADMIN_ROLE'){
        res.json({
            ok:false,
            err:{
                message: 'El usuario no es administrador'
            }
        })
    }else{
        next();
    }

    


}


module.exports = {
    verificaToken,
    verificaADMIN_ROLE
}