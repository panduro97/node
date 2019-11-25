const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El Nombre es necesario.']
    },
    email:{
        type: String,
        unique:true,
        required: [true, 'El correo es necesario']
    },
    password:{
        type: String,
        required: [true, 'la contrasena es obligatoria']
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function () {
    
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;

    return userObjet;
    
}

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser unico'} )

module.exports = mongoose.model('Usuario', usuarioSchema);
