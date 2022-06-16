const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let proovedorSchema = new Schema({
    nombre : String,
    empresa : String,
    correo : String,
    telefono : String
});



module.exports = mongoose.model('Proovedor', proovedorSchema);