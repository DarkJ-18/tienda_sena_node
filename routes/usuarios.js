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
  (req, res) => {
    req.session.usuario = {
      id: req.user._id,
      nombre_apellido: req.user.nombre_apellido,
      rol: req.user.rol
    };
    req.session.messages = [{ type: 'success', text: `¡Bienvenido, ${req.user.nombre_apellido}!` }];
    res.redirect('/');
  }
);

// Ruta para iniciar login con Facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.usuario = {
      id: req.user._id,
      nombre_apellido: req.user.nombre_apellido,
      rol: req.user.rol
    };
    req.session.messages = [{ type: 'success', text: `¡Bienvenido, ${req.user.nombre_apellido}!` }];
    res.redirect('/');
  }
);


// Ruta para iniciar login con GitHub
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.usuario = {
      id: req.user._id,
      nombre_apellido: req.user.nombre_apellido,
      rol: req.user.rol
    };
    req.session.messages = [{ type: 'success', text: `¡Bienvenido, ${req.user.nombre_apellido}!` }];
    res.redirect('/');
  }
);


router.get('/recuperar-password', usuarioController.formRecuperarPassword);
router.post('/recuperar-password', usuarioController.enviarRecuperarPassword);
router.get('/reset-password/:token', usuarioController.formResetPassword);
router.post('/reset-password/:token', usuarioController.resetPassword);




module.exports = router;