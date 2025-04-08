const modeloProducto = require('../models/producto.model.js');

// Consultar todos los productos
exports.consultar = async (req, res) => {
    try {
        let listaProductos = await modeloProducto.find({});
        console.log(listaProductos);
        if (listaProductos) {
            //res.json(listaProductos);
            res.render('pages/index', {listaProductos})
        } else {
            res.json({error: 'No hay productos en la base de datos'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al consultar los productos'});
    }
};

// Consultar un producto por referencia
exports.consultarPorReferencia = async (req, res) => {
    try {
        let producto = await modeloProducto.findOne({"referencia": req.params.ref});
        console.log(producto);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({error: 'No se encontró el producto'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al consultar el producto'});
    }
}

// Crear un producto

exports.createproduct = async (req, res) => {
    try {
        const newproduct = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            foto: req.body.foto,
            calificacion: req.body.calificacion,
            stock: req.body.stock,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            habilitado: true,
        };

        // Aquí deberías guardar el producto en la base de datos
        const productoCreado = await modeloProducto.create(newproduct);
        res.status(201).json({ mensaje: 'Producto creado con éxito', producto: productoCreado });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// actualizar producto
exports.updateProduct = async (req, res) => {
    const productoEditato = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        foto: req.body.foto,
        calificacion: req.body.calificacion,
        stock: req.body.stock,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        habilitado: true,
    };
    let Actualizacion = await modeloProducto.findOneAndUpdate({referencia: req.params.referencia}, productoEditato);
    if (Actualizacion) {
        res.status(200).json({mensaje: 'Producto actualizado con éxito'});
    } else {
        res.status(400).json({error: 'Error al actualizar el producto'});
    }
}

// eliminar producto
exports.deleteProduct = async (req, res) => {
    console.log(req.params.id, req.params.nombre);
    let Eliminacion = await modeloProducto.findOneAndDelete({referencia: req.params.referencia});
    if(Eliminacion)
        res.status(200).json({mensaje: 'Producto eliminado con exito'});
    else
        res.status(400).json({error: 'Error al eliminar el producto'});
}

