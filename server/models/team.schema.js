var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    // task = mongoose.model('task')

const TeamSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    task_roots: [Schema.Types.ObjectId],
    members: [Schema.Types.ObjectId],
    sub_groups: [Schema.Types.ObjectId]
})

// UserSchema.methods.someMethod = function(document, callback)

TeamSchema.post('save', function(next) {
// do something on save
});

mongoose.model('Team', TeamSchema);
