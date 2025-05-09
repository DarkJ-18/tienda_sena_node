const Producto = require('../models/producto_models');

exports.createProductRecord = async (productInfo) => {
    try {
     return new Producto(productInfo).save();
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


