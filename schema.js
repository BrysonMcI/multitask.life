var graphql = require('graphql');

var todos = [
    {
        "due": "Monday",
        "title": "Discussion post",
        "completed": false
    },
    {
        "due": "Sunday",
        "title": "watch superbowl",
        "completed": false
    }
];

var todoType = new graphql.GraphQLObjectType({
    name: 'todo',
    fields: function() {
        return {
            due: {
                type: graphql.GraphQLString
            },
            title: {
                type: graphql.GraphQLString
            },
            completed: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            todos: {
                type: new graphql.GraphQLList(todoType),
                resolve: function() {
                    return todos;
                }
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType
});

