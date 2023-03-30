if (obj[todo.id] === undefined) {
    obj[todo.id] = todo;

    fs.writeFile("todos.json", JSON.stringify(obj), (error) => {

    if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain', 
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' });
        response.end('Internal Server Error');
    } else {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(`Hello world written to todos.json successfully`);
    }
    })
} 