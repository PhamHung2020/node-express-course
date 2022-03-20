const { products } = require('../data');

const getAll = (req, res) => {
    let returnProducts = products.map(product => {
        const { id, name, image} = product;
        return { id, name, image };
    })

    const { search, limit} = req.query;
    if (search) {
        returnProducts = returnProducts.filter(
            product => product.name.includes(search)
        );
    }

    if (Number(limit)) {
        returnProducts = returnProducts.slice(0, Number(limit));
    }

    if (returnProducts.length === 0) {
        return res.status(200).json({ error: 'Cannot find any products matched your search'})
    }

    return res.json(returnProducts);
}

const getById = (req, res) => {
    const productId = req.params.productId;
    const singleProduct = products.find(product => product.id === Number(productId));
    if (!singleProduct) {
        return res.status(404).json({ error: 'Cannot find any products'});
    }
    return res.json(singleProduct);
}

module.exports = {
    getAll,
    getById
}