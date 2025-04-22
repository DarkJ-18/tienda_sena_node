const Usuario = require("../models/usuario_models");

// Crear un usuario
exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = {
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
        let usuario = await Usuario.create(nuevoUsuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario', detalle: error.message });
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