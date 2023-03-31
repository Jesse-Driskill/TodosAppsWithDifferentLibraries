


document.addEventListener("DOMContentLoaded", () => {
    
    let todos;

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
    const addButton = document.getElementById("addbutton");
    const subtractButton = document.getElementById('subtractbutton');
    const counter = document.getElementById('counter');
    //


    //todos
    const todoForm = document.getElementById('todoform');
    const todoTitle = document.getElementById('todotitle');
    const todoDescription = document.getElementById('tododescription');
    const listOfTodos = document.getElementById('listoftodos');
    const todosArray = [];
    const spawnTodo = (todo) => {
        todosArray.push(todo);

        let el1 = dce('li'); //li element to hold title and description
        let el2 = dce('div');  //div with title
        let el3 = dce('div');   //div with description
        let el4 = dce('button');    //delete button

        el1.classList.add('todo-li');
        el1.id = todo.id;

        el2.innerHTML = `Title: ${todo.title}`;
        el3.innerHTML = `Description: ${todo.description}`;
        el4.innerHTML = 'DELETE TODO';
        el4.todoId = todo.id;

        el1.appendChild(el2);
        el1.appendChild(el3);
        el1.appendChild(el4);
        listOfTodos.appendChild(el1);

        ael('click', el4, () => {
            el1.remove();
        })
    }
    // 


    //middleware

    //


    //
       setTimeout(() => {
           console.log(todos, 'im todos outside of fetch')
        }, 1000) 
    //




    // initializes the innerHTML of the element with the id of 'counter' to 0.
    counter.innerHTML = 0;


    ael('click', addButton, () => { 
        counter.innerHTML = parseInt(counter.innerHTML) + 1
        console.log('hi!')
    });
    ael('click', subtractButton, () => { 
        counter.innerHTML = parseInt(counter.innerHTML) - 1
    });

    

    const getTodos = () => {
        console.log('Getting todos!')
        fetch("api/todos", {
            method: "GET"
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        }).then(data => {
            // console.log(data, 'im data!')
            
            for(let todoId in data) {
                spawnTodo(data[todoId])
                
            }
        }).catch(error => {
            // console.error('Error:', error);
        })
    }

    getTodos();



    // Adds submit event listener to the todo form
    todoForm.addEventListener('submit', () => {
        event.preventDefault();

        let newTodo = {
            id: todosArray.length + 1,
            title: `${todoTitle.value}`,
            description: `${todoDescription.value}`
        }

        spawnTodo(newTodo);

        const data = JSON.stringify(newTodo);
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