const express = require('express');
//const path = require('path');
const morgan = require('morgan');
const { products, people } = require('./data');
const logger = require('./logger');

const app = express();

app.use(morgan('tiny'));
app.use(logger);
// app.use('/api', logger);

//app.use(express.static('./navbar-app'));
app.use(express.static('./methods-public'));
// app.get('/',, logger, (req, res) => {
//     res.sendFile(path.join(__dirname, 'navbar-app', 'index.html'));
// })

// parse form data
app.use(express.urlencoded({
    extended: false
}));
// parse json
app.use(express.json());

app.get('/', (req, res) => {
    return res.redirect('/api/products');
})

app.get('/api/products', (req, res) => {
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
})

app.get('/api/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const singleProduct = products.find(product => product.id === Number(productId));
    if (!singleProduct) {
        return res.status(404).json({ error: 'Cannot find any products'});
    }
    return res.json(singleProduct);
})

app.get('/about', (req, res) => {
    res.send('About');
})

app.all('*', (req, res) => {
    res.status(404).send('Not found');
})

app.listen(5000, () => console.log('Server is running'));

// APP METHOD
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen

// SERVER FIRST VERSION
// const http = require('http');
// const { readFileSync } = require('fs');

// const homePageContent = readFileSync('./navbar-app/index.html');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'content-type': 'text/html'
//     });
//     if (req.url === '/')
//         res.write(homePageContent)
//     else if (req.url === '/about')
//         res.write('<h1>About page</h1>')
//     else
//         res.write('Not thing')
//     res.end('some thing');
// });

// server.listen(5000, () => console.log('Server is running'));