var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(
        'mongodb://localhost/mtl'
    );

    require('../server/models/task.schema');
    require('../server/models/team.schema');
    require('../server/models/user.schema');

    return db;
}
