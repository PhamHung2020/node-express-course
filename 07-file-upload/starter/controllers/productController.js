const productModel = require('../models/Product');
const statusCode = require('http-status-codes');

const getAllProduct = async (req, res) => {
    res.send("Get all product");
}

const createProduct = async (req, res) => {
    res.send("Create a product");
}

module.exports = {
    getAllProduct,
    createProduct
}