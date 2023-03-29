const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((request, response) => {

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
    else if (request.method === 'GET' && (request.url === '/main.js' || request.url === '/style.css')) {
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
        });
    }
    else if (request.method === 'OPTIONS') {
        response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
        response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        response.writeHead(200);
    }
    else if (request.method === 'POST' && request.url === '/api/todos') {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        })
        request.on('end', () => {
            // console.log(body);
            const data = JSON.parse(body);
            response.writeHead(200, {'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' });
            response.end('Data received and processed!');

            //Need to read file, get object, then replace with new object that has the data

            fs.writeFile("todos.json", data, (error) => {

            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain', 
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' });
                response.end('Internal Server Error');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end(`Hello world written to todos.json successfully`);
            }
        })
        })

        
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' });
        response.end('Not Found');
    }
});



server.listen(3000, () => {
    console.log('Server running on port 3000')
})