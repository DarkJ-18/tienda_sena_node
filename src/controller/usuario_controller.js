const Usuario = require("../models/usuario_models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar un usuario
exports.registrarUsuario = async (req, res) => {
    console.log(req.body);
    try {
        const { nombre_apellido, correo, password, valid_password } = req.body;

        if (!nombre_apellido || !correo || !password || !valid_password) {
            return res.render('pages/registrarse', {
                csrfToken: req.csrfToken ? req.csrfToken() : '',
                messages: [{ type: 'danger', text: 'Todos los campos son obligatorios.' }],
                nombre_apellido: nombre_apellido || '',
                correo: correo || '',
                password: password || '',
                valid_password: valid_password || ''
            });
        }
        if (password !== valid_password) {
            return res.render('pages/registrarse', {
                csrfToken: req.csrfToken ? req.csrfToken() : '',
                messages: [{ type: 'danger', text: 'Las contraseñas no coinciden.' }],
                nombre_apellido: nombre_apellido || '',
                correo: correo || '',
                password: password || '',
                valid_password: valid_password || ''
            });
        }

        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.render('pages/registrarse', {
                csrfToken: req.csrfToken ? req.csrfToken() : '',
                messages: [{ type: 'danger', text: 'El correo ya está registrado.' }]
            });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const nuevoUsuario = new Usuario({
            nombre_apellido: nombre_apellido,
            correo,
            password: hashedPassword
        });

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();
        return res.render('pages/login', {
            csrfToken: req.csrfToken ? req.csrfToken() : '',
            messages: [{ type: 'success', text: 'Usuario registrado con éxito. Inicie sesión.' }]
        });
    } catch (error) {
        return res.render('pages/registrarse', {
            csrfToken: req.csrfToken ? req.csrfToken() : '',
            messages: [{ type: 'danger', text: 'Todos los campos son obligatorios.' }],
            nombre_apellido: req.body.nombre_apellido || '',
            correo: req.body.correo || '',
            password: req.body.password || '',
            valid_password: req.body.valid_password || ''
        });
    }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    try {
        // Verificar si el usuario ya está autenticado
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.render('pages/login', {
                csrfToken: req.csrfToken ? req.csrfToken() : '',
                messages: [{ type: 'danger', text: 'Correo o contraseña incorrectos.' }]
            });
        }
        // Verificar la contraseña
        const esValida = await bcrypt.compare(password, usuario.password);
        if (!esValida) {
            return res.render('pages/login', {
                csrfToken: req.csrfToken ? req.csrfToken() : '',
                messages: [{ type: 'danger', text: 'Correo o contraseña incorrectos.' }]
            });
        }
        req.session.usuario = {
            id: usuario._id,
            nombre_apellido: usuario.nombre_apellido,
            rol: usuario.rol
        };
        req.session.messages = [{ type: 'success', text: 'Inicio de sesión exitoso.' }];
        return res.redirect('/');
    } catch (error) {
        return res.render('pages/login', {
            csrfToken: req.csrfToken ? req.csrfToken() : '',
            messages: [{ type: 'danger', text: 'Error al iniciar sesión.' }]
        });
    }
};


// Consultar todos los usuarios
exports.consultarUsuarios = async (req, res) => {
    try {
        let usuarios = await Usuario.find({});
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los usuarios' });
    }
};

// Consultar un usuario por id
exports.consultarUsuarioPorId = async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar el usuario' });
    }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = {
            nombre_apellido: req.body.nombre_apellido,
            documento: req.body.documento,
            contacto: req.body.contacto,
            correo: req.body.correo,
            password: req.body.password,
            rol: req.body.rol,
            imagen_perfil: req.body.imagen_perfil,
            direccion: req.body.direccion,
            certificado: req.body.certificado
        };
        let usuario = await Usuario.findByIdAndUpdate(req.params.id, usuarioActualizado, { new: true });
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (usuario) {
            res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};