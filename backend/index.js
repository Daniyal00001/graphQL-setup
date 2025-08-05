const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { default: axios } = require("axios");
async function startServer() {

    const app = express();
    const server = new ApolloServer({                                                      //servers
        typeDefs: `
         type User {
            id: ID!
            name: String!
            username: String!
            email: String!
        }

         type Todo {
            id: ID!
            title: String!
            completed: Boolean!
            user: User
        }

        type Query {
            todos: [Todo],
            users: [User],
            getUserbyID(id: ID!): User
        }
        `,
        resolvers: {
            Todo: {
                user : async(todo)=>{
                    return (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
                }
            },
            Query: {
                todos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data
                ,
                users: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data
                ,
                getUserbyID: async (_, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data

            },
        }
    });
    await server.start();                                                                  //start
    server.applyMiddleware({ app });

    app.use(cors());
    app.use(bodyParser.json());                                                           // middleware
 
    app.listen(3000, () => {
        console.log(`🚀 Server ready at http://localhost:3000`);                           //listen
    });
}

startServer();
