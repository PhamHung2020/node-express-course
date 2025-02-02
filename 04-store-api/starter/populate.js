require('dotenv').config();

const Product = require('./models/product');
const jsonProducts = require('./products.json');
const connectDb = require('./db/connect');

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Success');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();