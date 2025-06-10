const express = require('express');
const router = express.Router();
const usuarioController = require('../src/controller/usuario_controller');
const passport = require('passport');

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

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);
module.exports = router;