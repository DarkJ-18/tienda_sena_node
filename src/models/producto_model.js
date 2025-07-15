const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: 1,
        maxlength: 100
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        minlength: 1,
        maxlength: 254
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo.']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['Moda', 'Tecnologia', 'Artesania', 'Accesorios', 'Servicios', 'Otros']
    },
    color: {
        type: String,
        enum: ['Ninguno', 'Gris', 'Blanco', 'Negro', 'Amarillo', 'Azul', 'Rojo'],
        default: 'Ninguno'
    },
    en_oferta: {
        type: Boolean,
        default: false
    },
    precio_original: {
        type: Number,
        required: [true, 'El precio original es obligatorio'],
        min: [0, 'El precio original no puede ser negativo.']
    },
    descuento: {
        type: Number,
        default: 0,
        min: [0, 'El descuento no puede ser negativo.']
    },
    imagenes: [{
        url: String,
        descripcion: String
    }],
    referencia: {
        type: String,
        required: true,
        unique: true
    },
    precio_final: {
        type: Number,
        default: 0
    }
});

function calcularPrecioFinal(doc) {
    if (doc.en_oferta && doc.descuento > 0) {
        doc.precio_final = doc.precio_original - (doc.precio_original * doc.descuento / 100);
    } else {
        doc.precio_final = doc.precio_original;
    }
}

// Validación de descuento - para save()
productoSchema.pre('save', function(next) {
    calcularPrecioFinal(this);
    next();
});

// Validación de descuento - para findOneAndUpdate()
productoSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    
    // Si se están actualizando campos relacionados con el precio
    if (update.precio_original !== undefined || update.descuento !== undefined || update.en_oferta !== undefined) {
        // Obtener los valores actuales y los nuevos
        const precio_original = update.precio_original;
        const descuento = update.descuento || 0;
        const en_oferta = update.en_oferta;
        
        if (precio_original !== undefined) {
            // Calcular precio final
            let precio_final = precio_original;
            if (en_oferta && descuento > 0) {
                precio_final = precio_original - (precio_original * descuento / 100);
            }
            
            // Agregar precio_final al update
            update.precio_final = precio_final;
            this.setUpdate(update);
        }
    }
    
    next();
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;