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
    else if (request.method === 'GET' && (request.url === '/main.js' || request.url === '/style.css') || request.url === '/todos/getTodos.js') {
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
    else if (request.method === 'POST' && request.url === '/api/todos') {
        console.log(request.method, 'im request.method');
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
            console.log(body, 'im body');
        })
        request.on('end', () => {
            let payload = JSON.parse(body);

            //beginning of action check for CREATETODO
            if (payload.action === "CREATETODO") {
                let todo = JSON.parse(body).todo;
                console.log(todo, 'I am todo')
                response.writeHead(200, {'Content-Type': 'text/plain' });
                response.end('Data received and processed!');

            //Need to read file, get object, then replace with new object that has the data

            

            readFilePromise("todos.json", "utf8").then((data) => {
                
                try {
                    
                    let obj = JSON.parse(data);
                    
                    console.log(obj, 'im obj line 73 try');
                    if (obj && obj[todo.id] === undefined) {
                        obj[todo.id] = todo;
                    }

                    fs.writeFile('todos.json', JSON.stringify(obj), (err) => {
                        // if (err) throw err;
                        if (err) {
                            response.writeHead(500, { 'Content-Type': 'text/plain'});
                            response.end('Internal Server Error');
                        } else {
                            response.writeHead(200, { 'Content-Type': 'text/plain' });
                            response.end(`Hello world written to todos.json successfully`);
                        }
                        console.log('Data written to file');
                    })

                } catch(error) {
                    
                    let obj = {};
                    obj[parseInt(todo.id)] = todo;

                    fs.writeFile('todos.json', JSON.stringify(obj), (err) => {
                        if (err) {
                            response.writeHead(500, { 'Content-Type': 'text/plain' });
                            response.end('Internal Server Error');
                        } else {
                            response.writeHead(200, { 'Content-Type': 'text/plain' });
                            response.end(`Data written to todos.json successfully`);
                        }
                        console.log('Data written to file');
                    })

                    console.error(error);
                } finally {
                    console.log('Done');
                }
            })
            }//end of action check for CREATETODO
            else if (payload.action === "DELETETODO") {
                let todoId = payload.todoId;
                console.log(payload.action);

                readFilePromise("todos.json", "utf8").then(data => {
                    try {
                        let obj = JSON.parse(data);
                        delete obj[todoId];

                        fs.writeFile("todos.json", JSON.stringify(obj), (err) => {
                            if (err) {
                                response.writeHead(500, {'Content-Type': 'text/plain'});
                                response.end('Internal Server Error');
                            } else {
                                response.writeHead(200, { 'Content-Type': 'text/plain' });
                                response.end('Data removed from todos.json successfully');
                            }
                        
                        })
                        console.log('Data deleted from file')
                    } catch {
                        response.writeHead(500, {'Content-Type': 'text/plain'});
                        response.end('Internal Server Error');
                    } finally {

                    }
                })
            }
            
        })
    } else if (request.method === 'GET' && request.url === '/api/todos') {
            readFilePromise("todos.json", "utf8").then((data) => {
            try {
                response.writeHead(200, {'Content-Type': 'application/json'});
                console.log(data, 'im data');
                response.write(data);
                response.end();
            } catch {
                console.log(data, 'im data');
                response.writeHead(200, {'Content-Type': 'application/javascript'});
                response.write('');
                response.end();
            }  finally {

            }
        })
        
        
    } 
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' });
        response.end('Not Found');
    }
});



server.listen(3000, () => {
    console.log('Server running on port 3000')
})