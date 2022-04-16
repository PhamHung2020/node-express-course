const express = require('express');
const {
    getAllProduct,
    createProduct
} = require('../controllers/productController');
const { uploadProductImage } = require('../controllers/uploadsController');

const router = express.Router();

router.route('/upload').post(uploadProductImage);
router.route('/').get(getAllProduct).post(createProduct);

module.exports = router;