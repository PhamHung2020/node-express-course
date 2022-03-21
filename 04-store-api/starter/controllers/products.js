const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const { name, feature, company, sort } = req.query;
    const queryObject = {};
    if (feature) {
        queryObject.feature = feature === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i'};
    }
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }
    const products = await result;
    return res.status(200).json({ products, nbHits: products.length });
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}