const graphql = require('graphql-compose').graphql;

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    graphqlHTTP = require('express-graphql'),
    graphqlSchema = require('../server/models/user.schema');

module.exports = function(mongoose) {
    var app = express();

    // we want server logging
    app.use(morgan('common'));
    // we also want to be able to parse request bodies
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // register API routes
//    require('../server/routes/api.routes')(app);
    app.use('/graphql', graphqlHTTP(req => ({
        schema: graphqlSchema,
        graphiql: true
    })));

    return app;
}
