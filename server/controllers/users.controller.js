var User = require('mongoose').model('User');
var Team = require('mongoose').model('Team');

export function createUser(req, res, next) {
    let name = req.body.name, email = req.body.email;
    if (name === undefined || email === undefined) {
        return res.status(400).json({
            error: 'true',
            reason: 'missing required parameters'
        });
    }
}
