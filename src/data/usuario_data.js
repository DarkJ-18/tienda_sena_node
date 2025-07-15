const Usuario = require('../models/usuario_model');

exports.createUserRecord = async (usuarioInfo) => {
    try {
        return new Usuario(usuarioInfo).save();
    } catch (error) {
        return error;
    }
};

exports.findUser = async (filter, projection) => {
    try {
        if (!projection) return await Usuario.findOne(filter);
        else return await Usuario.find(filter, projection);
    } catch (error) {
        return error;
    }
};

exports.updateUser = async (filter, update) => {
    try {
        return await Usuario.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
        return error;
    }
};

exports.deleteUser = async (filter) => {
    try {
        return await Usuario.findOneAndDelete(filter);
    } catch (error) {
        return error;
    }
};
