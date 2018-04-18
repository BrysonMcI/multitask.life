module.exports = function(app) {
    var user = require('../controllers/users.controller');
    var tasks = require('../controllers/task.controller');

    app.route('/api/tasks/task')
        .get(tasks.getTask)
        .post(tasks.createTask);

    app.route('/api/user/create')
        .post(user.createUser);
}
