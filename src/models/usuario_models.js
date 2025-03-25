const mongo = require("../config/connection");

const schemaUsuario = new mongo.Schema({  
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minLength: 3
    },
    apellido:{
        type: String,
        required: [true, 'El apellido es obligatorio'],
        minLength: 3
    },
    correo: {
        type: String,
        required: [true, 'El email es obligatorio'],
        minLength:5
    },
    contrasena: {
        type: String,
        minLength: 7,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol: {
        type: String,
        enum: ['administrador', 'vendedor', 'cliente'],
        default: 'invitado',
        required: [true, 'El rol es obligatorio'],
    },
    foto: {
        type: String,
        imagenURL: String     
    },
    pedido: {
        type: [pedidoSchema],
        default: []
    },

},{versionKey:false});

const modeloUsuario = mongo.model("usuario", schemaUsuario);

module.exports = modeloUsuario;


