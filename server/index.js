const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const Todo = mongoose.model("Todo", {
    text: String,
    complete: Boolean
});

const typeDefs = `
  type Query {
    todos: [Todo]
  }
  type Todo {
    id: ID!
    text: String!
    complete: Boolean!
  }
  type Mutation {
    createTodo(text: String!): Todo
    updateTodo(id: ID!, complete: Boolean!): Boolean
  }
`;

const resolvers = {
  Query: {
    todos: () => Todo.find()
  },
  Mutation: {
    createTodo: async (_, { text }) => {
      const todo = new Todo({ text, complete: false });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, {id, complete}) => {
      await Todo.findByIdAndUpdate(id, {complete});
      return true;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
    server.start(() => console.log('Server is running on localhost:4000'));
});
