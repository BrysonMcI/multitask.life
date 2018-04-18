var User = require('mongoose').model('User');

exports.createUser = function(req, res, next) {
    res.json({
        created: 'true'
    });
}
