const router = require('express').Router();
const productoController = require('../src/controller/producto_controller');

// Ruta para mostrar el formulario
router.get('/agregar_producto', productoController.mostrarFormularioAgregar);

router.get('/listar_producto_usuario', (req, res) => {
    res.render('pages/productos/listar_producto_usuario', {
        titulo: 'Productos'
    });
});

// Ruta para procesar el formulario
router.post('/agregar_producto', productoController.addProduct);

// Ruta para mostrar detalle de producto
router.get('/producto/:id', async (req, res) => {
    try {
        res.render('pages/productos/detalle_producto', {
            titulo: 'Detalle del Producto'
        });
    } catch (error) {
        console.error('Error al mostrar detalle del producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;