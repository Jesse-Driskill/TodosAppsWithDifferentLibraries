const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'todos.json'));
const todos = JSON.parse(data);
console.log(todos, 'im todos in todosdatajs')

module.exports = {
    getAllTodos: () => {
        let todosArray = Object.values(todos)
        return todosArray;
    },
    getTodoById: (id) => {
        return todos[id];
    },
    createNewTodo: (todo) => {
        if (!todos[todo.id]) {
            todos[todo.id] = todo;
            fs.writeFileSync(path.join(__dirname, 'todos.json'), JSON.stringify(todos));
        } else {
            console.error(`TODO WITH ID OF ${todo.id} ALREADY EXISTS`);
        }
    },
    updateTodoById: (id, title, description) => {
        if (todos[id]) {
            todos[id] = {
                id: id,
                title: title,
                description: description
            }
            console.log("IF STATEMENT TRIGGER")
            fs.writeFile(path.join(__dirname, 'todos.json'), JSON.stringify(todos), () => {
                console.log(JSON.stringify(todos));
            });
            return todos[id];
        } else {
            console.log("ELSE STATEMENT TRIGGER")
            console.error(`TODO WITH ID OF ${id} DOES NOT EXIST`);
        }
    },
    deleteTodo: (id) => {
        delete todos[id];
        fs.writeFileSync(path.join(__dirname, 'todos.json'), JSON.stringify(todos));
        return 'todo deleted successfully';
    }
}