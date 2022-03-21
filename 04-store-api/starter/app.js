require('dotenv').config();

// async errors

const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/product">Product Route</a>');
});

// product route

// error
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start server
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is running in port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

startServer();