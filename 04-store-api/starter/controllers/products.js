const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const { name, feature, company, sort, fields, numericFilter } = req.query;
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

    if (numericFilter) {
        const operators = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        const options = ['price', 'rating']

        const regex = /\b(>|>=|=|<|<=)\b/g;
        const numericFilterRegex = numericFilter.replace(regex, match => `-${operators[match]}-`);
        const filters = numericFilterRegex.split(',');
        filters.forEach(filter => {
            const [field, operator, value ] = filter.split('-');
            if (options.includes(field)) {
                if (!queryObject[field])
                    queryObject[field] = { [operator] : Number(value) };
                else
                    queryObject[field][operator] = Number(value);
            }
        });
    }
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    return res.status(200).json({ products, nbHits: products.length });
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}