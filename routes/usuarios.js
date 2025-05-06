const express = require('express');
const router = express.Router();
const usuarioController = require('../src/controller/usuario_controller');

// Mostrar formulario de registro
router.get('/registrarse', (req, res) => {
    res.render('pages/registrarse', {
        csrfToken: req.csrfToken ? req.csrfToken() : '',
        messages: [],
        nombre_apellido: '',
        correo: '',
        password: '',
        valid_password: ''
    });
});

// Mostrar formulario de login
router.get('/login', (req, res) => {
    res.render('pages/login', { messages: [], csrfToken: req.csrfToken ? req.csrfToken() : '' });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Procesar registro
router.post('/registrarse', usuarioController.registrarUsuario);

// Procesar login
router.post('/login', usuarioController.iniciarSesion);

module.exports = router;