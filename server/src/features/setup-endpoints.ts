import { UserModel } from '../database/database';

export default function setupEndpoints(app) {
    app.post('/api/login', function (req, res) {
        const { name: login, password } = req.body;
        UserModel.findOne({ name: login }, (err, user) => {
            if (!err) {
                if (!user) {
                    res.statusCode = 404;
                    return res.send({ type: 'AccountDoesNotExistsException' });
                }
                if (!user.validatePassword(password)) {
                    res.statusCode = 404;
                    return res.send({ type: 'WrongAccountPasswordException' });
                }
                const { id, name, email } = user;
                return res.send({ data: { id, name, email } });
            } else {
                res.statusCode = 500;
                return res.send({ type: 'Server error' });
            }
        });
    });

    app.post('/api/signin', function (req, res) {
        const { name, email, password } = req.body;
        const user = new UserModel({ name, email });
        user.password = user.hashPassword(password);
        user.save(err => {
            if (!err) {
                res.statusCode = 201;
                return res.send({ data: user });
            }
            if (err.code === 11000) {
                res.statusCode = 409;
                res.send({ type: 'AccountAlreadyExistsException' });
            } else {
                res.statusCode = 500;
                res.send({ type: 'Server error' });
            }
        });
    });

    app.get('/favicon.ico', (req, res) => res.end());

    app.use((req, res) => res.redirect('/'));
}
