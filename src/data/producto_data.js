const Producto = require('../models/producto_model');

exports.createProductRecord = async (productoInfo) => {
    try {
        return new Producto(productoInfo).save();
    } catch (error) {
        return error;
    }
};

exports.findProduct = async (filter, projection) => {
    try {
        if (!projection) return await Producto.findOne(filter);
        else return await Producto.find(filter, projection);
    } catch (error) {
        return error;
    }
};

exports.updateProduct = async (filter, update) => {
    try {
        return await Producto.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
        return error;
    }
};

exports.deleteProduct = async (filter) => {
    try {
        return await Producto.findOneAndDelete(filter);
    } catch (error) {
        return error;
    }
};


