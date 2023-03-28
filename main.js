
// const root = document.getElementById("root");

document.addEventListener("DOMContentLoaded", () => {
    
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
    // example usage: ael('click', redButton, () => {console.log('You just pressed a red button!'), event} )
    // upon clicking the red button, the console would log.
    // this function is just here so that you don't need to type addEventListener every time you want to add an event listener.
    //

    // dce stands for document.createElement
    // this is just here so that you don't have to type document.createElement every time you want to create an element
    const dce = (elementType) => {
        return document.createElement(elementType)
    }
    //

    // This section grabs and defines HTML elements as variables
    const hello = g('hello');
    const addButton = g("addbutton");
    const subtractButton = g('subtractbutton');
    const counter = g('counter');
    const submitTodoButton = g('submittodobutton');
    const todoForm = g('todoform');
    const todoTitle = g('todotitle');
    const todoDescription = g('tododescription');
    const listOfTodos = g('listoftodos');
    // 

    //initializes a todos array
    let todos = [];
    //

    // initializes the innerHTML of the element with the id of 'counter' to 0.
    counter.innerHTML = 0;

    // Adds click listeners to the add and subtract buttons
    // On each click, the innerHTML of the counter element is updated accordingly.
    ael('click', addButton, () => { counter.innerHTML = parseInt(counter.innerHTML) + 1});
    ael('click', subtractButton, () => { counter.innerHTML = parseInt(counter.innerHTML) - 1});

    // Adds submit event listener to the todo form
    ael('submit', todoForm, () => {

        event.preventDefault();

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
        
        const deleteTodoButton = document.createElement('button');
        deleteTodoButton.innerHTML = 'DELETE TODO';
        deleteTodoButton.todoId = newTodo.id;
        
        newTodoListItem.appendChild(deleteTodoButton);

        ael('click', deleteTodoButton, () => { g(deleteTodoButton.todoId).remove() })

    })
    

})


console.log("Hello world!")