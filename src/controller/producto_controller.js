// const Producto = require('../models/producto_model');
const productoData = require('../data/producto_data');


// Crear un producto
// exports.createProduct = async (req, res) => {
//     try {
//         const newProduct = {
//             nombre: req.body.nombre,
//             descripcion: req.body.descripcion,
//             stock: req.body.stock,
//             vendedor: req.body.vendedor, // Debe ser un ObjectId válido
//             categoria: req.body.categoria,
//             color: req.body.color,
//             en_oferta: req.body.en_oferta,
//             precio_original: req.body.precio_original,
//             descuento: req.body.descuento
//         };

//         const productoCreado = await Producto.create(newProduct);
//         res.status(201).json({ mensaje: 'Producto creado con éxito', producto: productoCreado });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Obtener todos los productos
// exports.getAllProducts = async (req, res) => {
//     try {
//         const productos = await Producto.find().populate('vendedor');
//         res.status(200).json(productos);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Obtener un producto por ID
// exports.getProductById = async (req, res) => {
//     try {
//         const producto = await Producto.findById(req.params.id).populate('vendedor');
//         if (!producto) {
//             return res.status(404).json({ mensaje: 'Producto no encontrado' });
//         }
//         res.status(200).json(producto);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Actualizar un producto
// exports.updateProduct = async (req, res) => {
//     try {
//         const updateFields = {
//             nombre: req.body.nombre,
//             descripcion: req.body.descripcion,
//             stock: req.body.stock,
//             vendedor: req.body.vendedor,
//             categoria: req.body.categoria,
//             color: req.body.color,
//             en_oferta: req.body.en_oferta,
//             precio_original: req.body.precio_original,
//             descuento: req.body.descuento
//         };

//         // Elimina campos undefined para evitar sobreescribir con undefined
//         Object.keys(updateFields).forEach(
//             key => updateFields[key] === undefined && delete updateFields[key]
//         );

//         const productoActualizado = await Producto.findByIdAndUpdate(
//             req.params.id,
//             updateFields,
//             { new: true, runValidators: true }
//         );
//         if (!productoActualizado) {
//             return res.status(404).json({ mensaje: 'Producto no encontrado' });
//         }
//         res.status(200).json({ mensaje: 'Producto actualizado', producto: productoActualizado });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Eliminar un producto
// exports.deleteProduct = async (req, res) => {
//     try {
//         const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
//         if (!productoEliminado) {
//             return res.status(404).json({ mensaje: 'Producto no encontrado' });
//         }
//         res.status(200).json({ mensaje: 'Producto eliminado' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.listarProductosUsuario = async (req, res) => {
//     try {
//         const productos = await Producto.find(); // Ajusta según tu lógica
//         res.render('pages/productos/listar_producto_usuario', {
//             titulo: 'Tienda Sena',
//             data: productos,
//             request: req // Si necesitas la sesión en la vista
//         });
//     } catch (error) {
//         res.status(500).send('Error al listar productos');
//     }
// };



exports.addProduct = async (req, res) => {
    try {
        // Busca si el producto ya existe
        const productIsRegistred = await productoData.findProduct({ referencia: req.body.referencia });
        if (productIsRegistred) {
            // Si existe, aumenta el stock en 1
            productIsRegistred.stock += 1;
            await productIsRegistred.save();
            
            // Redirigir con mensaje de éxito
            req.session.messages = [{ type: 'info', text: 'Stock aumentado en 1 para el producto existente' }];
            return res.redirect('/agregar_producto');
        }
        
        // Si no existe, crea el producto
        const producto = await productoData.createProductRecord(req.body);
        
        // Redirigir con mensaje de éxito
        req.session.messages = [{ type: 'success', text: 'Producto creado con éxito' }];
        return res.redirect('/agregar_producto');
        
    } catch (error) {
        console.error('Error al crear producto:', error);
        
        // Redirigir con mensaje de error
        req.session.messages = [{ type: 'danger', text: 'Error al crear el producto: ' + error.message }];
        return res.redirect('/agregar_producto');
    }
};

exports.mostrarFormularioAgregar = async (req, res) => {
    try {
        const messages = req.session.messages || [];
        req.session.messages = []; // Limpiar mensajes después de mostrarlos
        
        res.render('pages/productos/agregar_producto', {
            titulo: 'Agregar Producto',
            messages: messages
        });
    } catch (error) {
        console.error('Error al mostrar formulario:', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.findProduct = async (req, res) => {
    try {
            if (!projection) return await Producto.findOne(filter);
            else return await Producto.find(filter, projection);
        } catch (error) {
            return error;
        }
};

