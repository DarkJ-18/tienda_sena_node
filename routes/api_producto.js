const express = require('express');
const router = express.Router();
const Producto = require('../src/models/producto_model');


// Buscar productos por nombre
router.get('/api/productos/buscar', async (req, res) => {
    try {
        const { q, categoria, color, oferta, minPrecio, maxPrecio } = req.query;
        let filtros = {};

        if (q) {
            filtros.$or = [
                { nombre: { $regex: q, $options: 'i' } },
                { descripcion: { $regex: q, $options: 'i' } }
            ];
        }

        // Filtros adicionales
        if (categoria) filtros.categoria = categoria;
        if (color && color !== 'Ninguno') filtros.color = color;
        if (oferta === 'true') filtros.en_oferta = true;
        
        // Filtro por rango de precio
        if (minPrecio || maxPrecio) {
            filtros.precio_final = {};
            if (minPrecio) filtros.precio_final.$gte = parseFloat(minPrecio);
            if (maxPrecio) filtros.precio_final.$lte = parseFloat(maxPrecio);
        }

        const productos = await Producto.find(filtros);
        res.status(200).json({
            success: true,
            count: productos.length,
            data: productos
        });
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ success: false, message: 'Error al buscar productos' });
    }
});

// Obtener productos por categoría
router.get('/api/productos/categoria/:categoria', async (req, res) => {
    try {
        const { categoria } = req.params;
        const productos = await Producto.find({ categoria });
        res.status(200).json({
            success: true,
            categoria,
            count: productos.length,
            data: productos
        });
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        res.status(500).json({ success: false, message: 'Error al obtener productos por categoría' });
    }
});

// Obtener productos en oferta
router.get('/api/productos/ofertas', async (req, res) => {
    try {
        const productos = await Producto.find({ en_oferta: true }).sort({ descuento: -1 });
        res.status(200).json({
            success: true,
            count: productos.length,
            data: productos
        });
    } catch (error) {
        console.error('Error al obtener productos en oferta:', error);
        res.status(500).json({ success: false, message: 'Error al obtener productos en oferta' });
    }
});

// Obtener estadísticas de productos
router.get('/api/productos/estadisticas', async (req, res) => {
    try {
        const total = await Producto.countDocuments();
        const enOferta = await Producto.countDocuments({ en_oferta: true });
        const sinStock = await Producto.countDocuments({ stock: 0 });
        
        const categorias = await Producto.aggregate([
            { $group: { _id: '$categoria', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            success: true,
            estadisticas: {
                total,
                enOferta,
                sinStock,
                categorias
            }
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ success: false, message: 'Error al obtener estadísticas' });
    }
});

// Obtener todos los productos con paginación y filtros
router.get('/api/productos', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'nombre';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        // Construir filtros
        let filtros = {};
        
        // Búsqueda por texto (nombre o referencia)
        if (req.query.q) {
            filtros.$or = [
                { nombre: { $regex: req.query.q, $options: 'i' } },
                { referencia: { $regex: req.query.q, $options: 'i' } },
                { descripcion: { $regex: req.query.q, $options: 'i' } }
            ];
        }
        
        // Filtro por categoría
        if (req.query.categoria) {
            filtros.categoria = req.query.categoria;
        }
        
        // Filtro por stock
        if (req.query.stock) {
            switch (req.query.stock) {
                case 'sin_stock':
                    filtros.stock = 0;
                    break;
                case 'bajo_stock':
                    filtros.stock = { $lt: 10, $gt: 0 };
                    break;
                case 'con_stock':
                    filtros.stock = { $gt: 0 };
                    break;
            }
        }

        const productos = await Producto.find(filtros)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        const total = await Producto.countDocuments(filtros);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: productos,
            pagination: {
                currentPage: page,
                totalPages,
                totalProducts: total,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ success: false, message: 'Error al obtener productos' });
    }
});

// Obtener un producto por ID
router.get('/api/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar que el ID sea un ObjectId válido
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de producto inválido' 
            });
        }

        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }

        res.status(200).json({
            success: true,
            data: producto
        });
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener producto' 
        });
    }
});

// Crear un producto con validación mejorada
router.post('/api/productos', async (req, res) => {
    try {
        const { nombre, descripcion, stock, categoria, precio_original, referencia } = req.body;

        // Validaciones básicas
        if (!nombre || !descripcion || stock === undefined || !categoria || !precio_original || !referencia) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: nombre, descripcion, stock, categoria, precio_original, referencia'
            });
        }

        // Verificar si ya existe un producto con la misma referencia
        const productoExistente = await Producto.findOne({ referencia });
        if (productoExistente) {
            return res.status(409).json({
                success: false,
                message: 'Ya existe un producto con esta referencia'
            });
        }

        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        
        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: nuevoProducto
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
});

// Actualizar un producto por ID con validación
router.put('/api/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de producto inválido' 
            });
        }

        // Si se está actualizando la referencia, verificar que no exista
        if (req.body.referencia) {
            const productoExistente = await Producto.findOne({ 
                referencia: req.body.referencia,
                _id: { $ne: id }
            });
            
            if (productoExistente) {
                return res.status(409).json({
                    success: false,
                    message: 'Ya existe un producto con esta referencia'
                });
            }
        }

        const producto = await Producto.findByIdAndUpdate(
            id, 
            req.body, 
            { 
                new: true, 
                runValidators: true 
            }
        );
        
        if (!producto) {
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto actualizado exitosamente',
            data: producto
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error al actualizar producto' 
        });
    }
});

// Eliminar un producto con validación
router.delete('/api/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de producto inválido' 
            });
        }

        const producto = await Producto.findByIdAndDelete(id);
        
        if (!producto) {
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto eliminado exitosamente',
            data: { id: producto._id, nombre: producto.nombre }
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al eliminar producto' 
        });
    }
});

// Actualizar stock de un producto
router.patch('/api/productos/:id/stock', async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad, operacion } = req.body; // operacion: 'add', 'subtract', 'set'
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de producto inválido' 
            });
        }

        if (!cantidad || !operacion) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere cantidad y operación (add, subtract, set)'
            });
        }

        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        let nuevoStock;
        switch (operacion) {
            case 'add':
                nuevoStock = producto.stock + parseInt(cantidad);
                break;
            case 'subtract':
                nuevoStock = producto.stock - parseInt(cantidad);
                if (nuevoStock < 0) nuevoStock = 0;
                break;
            case 'set':
                nuevoStock = parseInt(cantidad);
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Operación inválida. Use: add, subtract, set'
                });
        }

        producto.stock = nuevoStock;
        await producto.save();

        res.status(200).json({
            success: true,
            message: `Stock actualizado exitosamente`,
            data: {
                id: producto._id,
                nombre: producto.nombre,
                stockAnterior: producto.stock - (nuevoStock - producto.stock),
                stockActual: producto.stock
            }
        });
    } catch (error) {
        console.error('Error al actualizar stock:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar stock'
        });
    }
});

module.exports = router;