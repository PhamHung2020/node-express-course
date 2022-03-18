const http = require('http');
const { readFileSync } = require('fs');

const homePageContent = readFileSync('./navbar-app/index.html');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    if (req.url === '/')
        res.write(homePageContent)
    else if (req.url === '/about')
        res.write('<h1>About page</h1>')
    else
        res.write('Not thing')
    res.end('some thing');
});

server.listen(5000, () => console.log('Server is running'));