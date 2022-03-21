const getAllProductsStatic = async (req, res) => {
    throw new Error('error');
    return res.status(200).json({ message: 'Static'});
}

const getAllProducts = async (req, res) => {
    return res.status(200).json({ message: 'Products' });
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}