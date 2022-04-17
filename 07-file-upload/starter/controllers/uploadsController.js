const productModel = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');

const uploadProductImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No file upload');
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload image');
    }
    if (productImage.size > 1024*1024) {
        throw new CustomError.BadRequestError('Please upload image smaller then 1 KB');
    }
    const imagePath = path.join(__dirname, '../public/uploads', productImage.name);
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({image: {src: `/uploads/${productImage.name}`}});
}

module.exports = {
    uploadProductImage
}