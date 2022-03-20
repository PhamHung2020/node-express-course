const express = require('express');
//const path = require('path');
const morgan = require('morgan');
const logger = require('./logger');
const productRouter = require('./routes/product.route');

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

app.use('/api/products', productRouter);

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