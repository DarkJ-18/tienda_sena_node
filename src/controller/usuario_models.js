const modeloProducto = require("../models/producto_models");
const modeloUsuario = require("../models/usuario_models");
const modeloPedido = require("../models/pedido_models");

// crear un usuario
exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            rol: req.body.rol,
            foto: req.body.foto,
            pedido: []
        };
        let usuario = await modeloUsuario.create(nuevoUsuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({error: 'Error al crear el usuario'});
    }
}

// consultar todos los usuarios
exports.consultarUsuarios = async (req, res) => {
    try {
        let usuarios = await modeloUsuario.find({});
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({error: 'Error al consultar los usuarios'});
    }
}

// consultar un usuario por id
exports.consultarUsuarioPorId = async (req, res) => {
    try {
        let usuario = await modeloUsuario.findById(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({error: 'Usuario no encontrado'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al consultar el usuario'});
    }
}

// actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            rol: req.body.rol,
            foto: req.body.foto,
            pedido: req.body.pedido
        };
        let usuario = await modeloUsuario.findByIdAndUpdate(req.params.id, usuarioActualizado, {new: true});
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({error: 'Usuario no encontrado'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el usuario'});
    }
}

// eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await modeloUsuario.findByIdAndDelete(req.params.id);
        if (usuario) {
            res.status(200).json({mensaje: 'Usuario eliminado con éxito'});
        } else {
            res.status(404).json({error: 'Usuario no encontrado'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el usuario'});
    }
}

// crear un pedido

exports.crearPedido = async (req, res) => {
    try {
        const nuevoPedido = {
            productoId: req.body.productoId,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            fecha: req.body.fecha
        };
        let pedido = await modeloPedido.create(nuevoPedido);
        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json({error: 'Error al crear el pedido'});
    }
}

// consultar todos los pedidos
exports.consultarPedidos = async (req, res) => {
    try {
        let pedidos = await modeloPedido.find({});
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({error: 'Error al consultar los pedidos'});
    }
}

// consultar un pedido por id
exports.consultarPedidoPorId = async (req, res) => {
    try {
        let pedido = await modeloPedido.findById(req.params.id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({error: 'Pedido no encontrado'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al consultar el pedido'});
    }
}

// cancelar un pedido
exports.cancelarPedido = async (req, res) => {
    try {
        let pedido = await modeloPedido.findByIdAndDelete(req.params.id);
        if (pedido) {
            res.status(200).json({mensaje: 'Pedido cancelado con éxito'});
        } else {
            res.status(404).json({error: 'Pedido no encontrado'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al cancelar el pedido'});
    }
}

