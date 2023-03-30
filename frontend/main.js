

document.addEventListener("DOMContentLoaded", () => {
    
    let todos;

    fetch("api/todos", {
        method: "GET"
        // headers: {"Content-Type": "application/json"},

    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok');
    }).then(data => {
        todos = data;
        console.log(data);
    }).catch(error => {
        console.error('Error:', error);
    })
    
    // This function is just here so that you can save time when grabbing elements by their ids.
    const g = (string) => {
        return document.getElementById(string);
    }
    //

    // ael stands for addEventListener
    // This function takes in an eventType, element, function, and event.
    // First, it prevents the default action of the event to stop the page from reloading.
    // Then it returns the element with an event listeners that listens for whichever eventType you specified.
    // Upon the eventType happening to the element, the element will trigger the function.
    const ael = (eventType, element, func) => {
        return element.addEventListener(eventType, () => func(event) );
    }
    // example usage: ael('click', redButton, () => {console.log('You just pressed a red button!')} )
    // upon clicking the red button, the console will log the message.
    // this function is just here so that you don't need to type addEventListener every time you want to add an event listener.
    //

    // dce stands for document.createElement
    // this is just here so that you don't have to type document.createElement every time you want to create an element
    const dce = (elementType) => {
        return document.createElement(elementType)
    }
    //

    // This section grabs and defines HTML elements as variables
    const hello = document.getElementById('hello');
    const addButton = document.getElementById("addbutton");
    const subtractButton = document.getElementById('subtractbutton');
    const counter = document.getElementById('counter');

    //todos
    const submitTodoButton = document.getElementById('submittodobutton');
    const todoForm = document.getElementById('todoform');
    const todoTitle = document.getElementById('todotitle');
    const todoDescription = document.getElementById('tododescription');
    const listOfTodos = document.getElementById('listoftodos');
    // 

    //initializes a todos array
        console.log(todos, 'im todos outside of fetch')
    //




    // initializes the innerHTML of the element with the id of 'counter' to 0.
    counter.innerHTML = 0;

    // Adds click listeners to the add and subtract buttons
    // On each click, the innerHTML of the counter element is updated accordingly.

    // document.getElementById('addbutton').addEventListener('click', () => {
    //     document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML) + 1;
    // })

    // document.getElementById('subtractbutton').addEventListener('click', () => {
    //     document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML) - 1;
    // })

    ael('click', addButton, () => { 
        counter.innerHTML = parseInt(counter.innerHTML) + 1
        console.log('hi!')
    });
    ael('click', subtractButton, () => { 
        counter.innerHTML = parseInt(counter.innerHTML) - 1
    });

    // Adds submit event listener to the todo form
    todoForm.addEventListener('submit', () => {
        event.preventDefault();
        // event.preventDefault();

        let newTodo = {
            id: todos.length + 1,
            title: `${todoTitle.value}`,
            description: `${todoDescription.value}`
        }

        todos.push(newTodo);

        const newTodoListItem = dce('li');
        newTodoListItem.id = newTodo.id;

        const newTodoTitle = dce('div');
        newTodoTitle.id = 'newTodoTitle';
        newTodoTitle.innerHTML = `Title: ${newTodo.title}`;

        const newTodoDescription = dce('div');
        newTodoDescription.id = 'newTodoDescription';
        newTodoDescription.innerHTML = `Description: ${newTodo.description}`;

        listOfTodos.appendChild(newTodoListItem);

        newTodoListItem.appendChild(newTodoTitle);
        newTodoListItem.appendChild(newTodoDescription);
        
        const deleteTodoButton = dce('button');
        deleteTodoButton.innerHTML = 'DELETE TODO';
        deleteTodoButton.todoId = newTodo.id;
        
        newTodoListItem.appendChild(deleteTodoButton);

        ael('click', deleteTodoButton, () => { 
            todos.splice(deleteTodoButton.todoId - 1, 1) 
            g(deleteTodoButton.todoId).remove();
            console.log(todos);
        });

        const id = newTodo.id
        const title = newTodo.title;
        const description = newTodo.description;

        let newObj = {};
        newObj = {id: id, title: title, description: description};
        console.log(newObj, 'Im newObj')

        const data = JSON.stringify(newObj);
        fetch("/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    

    });
    //
    

})


console.log("Hello world!")