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
    updateTodoById: (id, input) => {
        if (todos[id]) {
            todos[id] = {
                id: id,
                title: input.title,
                description: input.description
            }

            fs.writeFileSync('./todos.json', JSON.stringify(todos));
        } else {
            console.error(`TODO WITH ID OF ${id} DOES NOT EXIST`);
        }
    },
    deleteTodo: (id) => {
        delete todos[id];
        fs.writeFileSync('./todos.json', JSON.stringify(todos));
        
    }
}