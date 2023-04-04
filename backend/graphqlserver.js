const { ApolloServer, gql } = require('apollo-server');

const typeDefinitions = `
    type Todo {
        id: ID!
        title: String!
        description: String
    }

    type Query {
        getTodo(id: ID!): Todo
        getTodos: [Todo]
    }

    type Mutation {
        createTodo(title: String!, description: String): Todo!
        updateTodo(title: String!, description: String): Todo!
        deleteTodo(id: ID!): ID!
    }
`

const resolvers = {
    Query: {
        todos: () => { return getAllTodos(); },
        todo: (_, {id}) => {
            return getTodoById(id);
        }
    },
    Mutation: {
        createTodo: (_, { input }) => {
            const newTodo = createNewTodo(input);
            return newTodo;
        },
        updateTodo: (_, {id, input}) => {
            const updatedTodo = updateTodoById(id, input);
            return updatedTodo;
        },
        deleteTodo: (_, {id}) => {
            const deletedTodo = deleteTodoById(id);
            return deletedTodo;
        }
    },
    Todo: {

    }
}

const apolloServer = new ApolloServer({ typeDefinitions, resolvers });
apolloServer.listen(4000).then(() => {
    console.log(`Server ready at port 4000`)
});