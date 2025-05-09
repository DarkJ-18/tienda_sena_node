const router = require('express').Router();
const productoController = require('../src/controller/producto_controller');

// Ruta para mostrar el formulario
router.get('/agregar_producto', (req, res) => {
    res.render('pages/productos/agregar_producto');
});

router.get('/listar_producto_usuario', (req, res) => {
    res.render('pages/productos/listar_producto_usuario');
});

// Ruta para procesar el formulario
router.post('/agregar_producto', productoController.addProduct);

module.exports = router;