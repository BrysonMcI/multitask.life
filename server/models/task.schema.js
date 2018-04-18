var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    // task = mongoose.model('task')

const TaskSchema = new Schema({
    title: String,
    metadata: {
        due: Date,
        start: Date,
        reminders: Schema.Types.Array,
        comment: String
    },
    teams: [Schema.Types.ObjectId],
    parent_task: Schema.Types.ObjectId,
    children: [Schema.Types.ObjectId]
})

// UserSchema.methods.someMethod = function(document, callback)

TaskSchema.post('save', function(next) {
// do something on save
});

mongoose.model('Task', TaskSchema);
