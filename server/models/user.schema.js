var mongoose = require('mongoose'),
    composeWithMongoose = require('graphql-compose-mongoose').composeWithMongoose,
    schemaComposer = require('graphql-compose').schemaComposer;

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const UserSchema = new mongoose.Schema({
    name: String, // standard types
    email: {
        type: String,
        index: true,
        unique: true,
    },
    teams: [mongoose.Schema.Types.ObjectId],
});
const UserModel = mongoose.model('User', UserSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const UserTC = composeWithMongoose(UserModel, customizationOptions);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD USER OPERATIONS
// via graphql-compose it will be much much easier, with less typing
schemaComposer.rootQuery().addFields({
userById: UserTC.getResolver('findById'),
userByIds: UserTC.getResolver('findByIds'),
userOne: UserTC.getResolver('findOne'),
userMany: UserTC.getResolver('findMany'),
userCount: UserTC.getResolver('count'),
userConnection: UserTC.getResolver('connection'),
userPagination: UserTC.getResolver('pagination'),
});

schemaComposer.rootMutation().addFields({
userCreate: UserTC.getResolver('createOne'),
userUpdateById: UserTC.getResolver('updateById'),
userUpdateOne: UserTC.getResolver('updateOne'),
userUpdateMany: UserTC.getResolver('updateMany'),
userRemoveById: UserTC.getResolver('removeById'),
userRemoveOne: UserTC.getResolver('removeOne'),
userRemoveMany: UserTC.getResolver('removeMany'),
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;
