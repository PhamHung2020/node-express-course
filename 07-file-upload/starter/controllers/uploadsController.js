const productModel = require('../models/Product');
const statusCode = require('http-status-codes');

const uploadProductImage = async (req, res) => {
    res.send("Upload image");
}

module.exports = {
    uploadProductImage
}