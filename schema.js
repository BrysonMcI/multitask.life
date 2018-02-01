var graphql = require('graphql');
var mongoose = require('mongoose');
/* start mongo stuff */
const mongoStr = "mongodb://127.0.0.1/mtl";

// setup connection
mongoose.connect(mongoStr, (error) => {
    if (error) console.error(error)
    else console.log('mongo connection successful');
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

// define schema within mongo
var todoMongo = new mongoose.Schema({
    due: Date,
    title: String,
    completed: Boolean
});

// register with a model
var todos = mongoose.model('todo', todoMongo);
/* end mongo stuff */

/* start gql stuff */

// what does a todo look like to gql?
var todoType = new graphql.GraphQLObjectType({
    name: 'todo',
    fields: function() {
        return {
            due: {
                type: graphql.GraphQLString
            },
            title: {
                type: graphql.GraphQLString,
                description: 'what needs to be done'
            },
            completed: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

// interface for querying todo items
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            todos: {
                type: new graphql.GraphQLList(todoType),
                resolve: function() {
                    return new Promise((resolve, reject) => {
                        todos.find((err, data) => {
                            if (err) reject(err)
                            else resolve(data)
                        })
                    })
                }
            }
        }
    }
});

// what happens when we want to add a todo item?
var mutationAdd = {
    type: todoType,
    description: 'Add a Todo',
    args: {
      title: {
        name: 'Todo title',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      }
    },
    resolve: (root, args) => {
      var newTodo = new todos({
        title: args.title,
        completed: false
      })
      // newTodo.id = newTodo._id
      return new Promise((resolve, reject) => {
        newTodo.save(function (err) {
          if (err) reject(err)
          else resolve(newTodo)
        })
      })
    }
}

/* reference delete */
/*
var MutationDestroy = {
    type: TodoType,
    description: 'Destroy the todo',
    args: {
      id: {
        name: 'Todo Id',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      return new Promise((resolve, reject) => {
        TODO.findById(args.id, (err, todo) => {
          if (err) {
            reject(err)
          } else if (!todo) {
            reject('Todo NOT found')
          } else {
            todo.remove((err) => {
              if (err) reject(err)
              else resolve(todo)
            })
          }
        })
      })
    }
  }
*/

// define our interface for mutations on todo objects
var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: mutationAdd
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
