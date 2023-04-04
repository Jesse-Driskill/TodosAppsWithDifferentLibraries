// import { getAllTodos, getTodoById, updateTodoById, deleteTodo, createNewTodo } from './todosData';
const todoMiddleware = require('./todosData.js')

const getAllTodos = todoMiddleware.getAllTodos;
const getTodoById = todoMiddleware.getTodoById;
const updateTodoById = todoMiddleware.updateTodoById;
const deleteTodo = todoMiddleware.deleteTodo;
const createNewTodo = todoMiddleware.createNewTodo;

console.log(deleteTodo);

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
        // getTodos: () => { return [getAllTodos()]; },
        getTodos: () => { return getAllTodos() },
        getTodo: (_, {id}) => {
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
    // Todo: {

    // }
}






const apolloServer = new ApolloServer({ typeDefs: typeDefinitions, resolvers });
apolloServer.listen(4000).then(() => {
    console.log(`Server ready at port 4000`)
});