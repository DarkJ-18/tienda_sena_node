const mongo = require("../config/connection");

const schemaProducto = new mongo.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minLength: 3
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    foto: {
        type: String,
        imagenURL: String     
    },
    calificacion: {
        type: Number,
        required: [true, 'La calificacion es obligatoria'],
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        minLength: 3
    },
    categoria: {
        type: String,
        required: [true, 'La categoria es obligatoria'],
    },
},{versionKey:false});

const modeloProducto = mongo.model("producto", schemaProducto);