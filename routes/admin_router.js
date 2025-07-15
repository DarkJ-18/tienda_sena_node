const express = require('express');
const router = express.Router();
const Producto = require('../src/models/producto_model');
const Usuario = require('../src/models/usuario_model');
const verificarAdmin = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    
    if (req.session.usuario.rol !== 1) {
        return res.status(403).render('pages/error', {
            titulo: 'Acceso Denegado',
            mensaje: 'No tienes permisos para acceder a esta sección'
        });
    }
    
    next();
};

router.get('/admin', verificarAdmin, (req, res) => {
    res.redirect('/admin/productos');
});

router.get('/admin/productos', verificarAdmin, (req, res) => {
    res.render('pages/administrador/productos/listar_productos_admin', {
        titulo: 'Administración de Productos'
    });
});

router.get('/admin/usuarios', verificarAdmin, (req, res) => {
    res.render('pages/administrador/usuarios/listar_usuario_admin', {
        titulo: 'Administración de Usuarios'
    });
});

router.get('/admin/usuarios/agregar', verificarAdmin, (req, res) => {
    res.render('pages/administrador/usuarios/agregar_usuario_admin', {
        titulo: 'Agregar Usuario'
    });
});

router.get('/api/admin/estadisticas', verificarAdmin, async (req, res) => {
    try {
        const totalProductos = await Producto.countDocuments();
        const totalUsuarios = await Usuario.countDocuments();
        const productosActivos = await Producto.countDocuments({ stock: { $gt: 0 } });
        const productosSinStock = await Producto.countDocuments({ stock: 0 });
        const productosEnOferta = await Producto.countDocuments({ en_oferta: true });
        
        // Usuarios por rol
        const administradores = await Usuario.countDocuments({ rol: 1 });
        const clientes = await Usuario.countDocuments({ rol: 2 });
        const vendedores = await Usuario.countDocuments({ rol: 3 });
        
        // Productos por categoría
        const productosPorCategoria = await Producto.aggregate([
            {
                $group: {
                    _id: '$categoria',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        res.json({
            success: true,
            data: {
                productos: {
                    total: totalProductos,
                    activos: productosActivos,
                    sinStock: productosSinStock,
                    enOferta: productosEnOferta
                },
                usuarios: {
                    total: totalUsuarios,
                    administradores,
                    clientes,
                    vendedores
                },
                categorias: productosPorCategoria
            }
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas'
        });
    }
});

module.exports = router;
