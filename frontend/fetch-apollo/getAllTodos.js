module.exports = {
    getTodos: () => {
        console.log('Getting todos!');
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {query: getTodosQuery} )
        }).then(response => {
            console.log(response, 'im response')
            if (response.ok) {
                return response.json();
            }
            // response.json();
            throw new Error('Network response was not ok');
        }).then(dataBundle => {
            
            let todos = dataBundle.data.getTodos;

            todos.forEach(todo => {
                spawnTodo(todo)
            }) 
        }).catch(error => {
            console.error('Error:', error);
        })
    }
}