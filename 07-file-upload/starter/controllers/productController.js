const productModel = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    const products = await productModel.find({});
    return res.status(StatusCodes.OK).json({products});
}

const createProduct = async (req, res) => {
    const product = await productModel.create(req.body);
    return res.status(StatusCodes.CREATED).json({product});
}

module.exports = {
    getAllProducts,
    createProduct
}