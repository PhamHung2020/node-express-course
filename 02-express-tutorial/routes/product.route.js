const express = require('express');
const { getAll, getById } = require('../controllers/product.controller');

const router = express.Router();


router.get('/', getAll);

router.get('/:productId', getById);


module.exports = router;