const productModel = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    res.send("Get all product");
}

const createProduct = async (req, res) => {
    const product = await productModel.create(req.body);
    return res.status(StatusCodes.CREATED).json({product});
}

module.exports = {
    getAllProducts,
    createProduct
}