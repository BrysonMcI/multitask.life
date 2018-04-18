var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    // task = mongoose.model('task')

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    //    match: /\w+@\w+\.\w+/
    },
    task_roots: [Schema.Types.ObjectId],
    teams: [Schema.Types.ObjectId]
})

// UserSchema.methods.someMethod = function(document, callback)

UserSchema.post('save', function(next) {
// do something on save
});

mongoose.model('User', UserSchema);
