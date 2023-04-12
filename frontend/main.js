DatoCMSToken = window.DatoToken;


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
        let el5 = dce('button');    //edit button

        el1.classList.add('todo-li');
        el1.id = todo.id;

        el2.innerHTML = `Title: ${todo.title}`;
        el3.innerHTML = `Description: ${todo.description}`;
        el4.innerHTML = 'DELETE TODO';
        el5.innerHTML = 'EDIT TODO';

        el4.todoId = todo.id;

        el1.appendChild(el2);
        el1.appendChild(el3);
        el1.appendChild(el4);
        el1.appendChild(el5);
        listOfTodos.appendChild(el1);

        ael('click', el4, () => {
            fetch("api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    todoId: todo.id,
                    action: "DELETETODO"
                })

            })
            el1.remove();
        });

        ael('click', el5, () => {
            let el6 = dce('form'); //New form to update todos
            let el7 = dce('input'); //Todo title input
            let el8 = dce('input'); //Todo description input
            let el9 = dce('button'); // New todo form submit button

            el6.setAttribute('action', "/api/todos/");
            el6.setAttribute('method', "POST");

            el7.classList.add('extend-height');
            el8.classList.add('extend-height');

            el7.setAttribute('placeholder', 'New todo title');
            el8.setAttribute('placeholder', 'New todo description');
            el9.setAttribute('type', 'submit');
            el9.innerHTML = 'Submit new todo';

            el6.addEventListener('submit', (event) => {

                event.preventDefault();
                let newTodo = {
                    id: todo.id,
                    title: el7.value,
                    description: el8.value,
                };

                el2.innerHTML = `Title: ${newTodo.title}`;
                el3.innerHTML = `Description: ${newTodo.description}`;

                

                let data = JSON.stringify({todo: newTodo, action: "UPDATETODO"});

                fetch("/api/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: data
                }).then(response => response.text()).then(data => console.log(data)).catch(error => console.error(error))
                
            
            })

            el6.appendChild(el7);
            el6.appendChild(el8);
            el6.appendChild(el9);
            el1.appendChild(el6);
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
        fetch("https://graphql.datocms.com/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${DatoCMSToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: `
                query {
                    allTodos {
                        todoId
                        title
                        description
                    }
                }
            `})
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        }).then(data => {
            console.log(data, 'im data!')
            
            for(let todoId in data.data.allTodos) {
                spawnTodo(data.data.allTodos[todoId])   
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

        const data = JSON.stringify({todo: newTodo, action: 'CREATETODO'});
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