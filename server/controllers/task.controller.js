var Task = require('mongoose').model('Task');

exports.getTask = function(req, res, next) {
    return res.json({
        'it': 'worked'
    });
}

exports.createTask = function(req, res, next) {
    return res.json({
        'it': 'worked, again'
    });
}
