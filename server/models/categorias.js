const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId;

let Schema = mongoose.Schema

let categoriaSchema = new Schema({
    descripcion: 
    {   type: String, 
        unique: true, 
        required: [true, 'La descripcion es obligatoria']
    },
    usuario: 
    {
        type: ObjectId, 
        ref: 'Usuario' 
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);