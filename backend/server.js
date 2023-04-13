const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((request, response) => {

    function readFilePromise(filePath, options) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, options, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    // response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
    // response.Content.Headers.Allow.Add("POST");

    if (request.url === '/') {
        const filePath = path.join(__dirname, '..', 'frontend', 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain' });
                response.end('Error reading file');
            }
            else {
                response.writeHead(200, {'Content-Type': 'text/html' });
                response.end(data);
            }
        })

    }
    else if (request.method === 'GET' ) {
        //&& (request.url === '/main.js' || request.url === '/style.css' || request.url === '/env.js')
        const filePath = path.join(__dirname, '..', 'frontend', request.url);
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end('Error reading file');
          } else {
            const contentType = request.url.endsWith('.js') ? 'text/javascript' : 'text/css';
            response.writeHead(200, {'Content-Type': contentType});
            response.end(data);
          }
        })
    }
})



server.listen(3000, () => {
    console.log('Server running on port 3000')
})