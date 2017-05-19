const md5 = require('md5');
import { UserModel } from '../database/database';

export default function setupEndpoints(app) {
    app.post('/api/login', function(req, res) {
      const { email, password } = req.body;
      UserModel.findOne({ email, password: md5(password) }, 'name email', (err, user) => {
        if (!err) {
          if (!user) {
            res.statusCode = 404;
            return res.send({ type: 'AccountDoesNotExistsException' });
          }
          return res.send({ data: { user } });
        } else {
          res.statusCode = 500;
          return res.send({ type: 'Server error' });
        }
      });
    });

    app.post('/api/signin', function(req, res) {
        const { name, email, password } = req.body;
        const user = new UserModel({
          name,
          email,
          password: md5(password)
        });
        user.save(err => {
          if (!err) {
            return res.send({status: 'OK', user });
          }
          if(err.code === 11000) {
            res.statusCode = 409;
            res.send({ type: 'AccountAlreadyExistsException' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
        });
    });

    app.get('/favicon.ico', (req, res) => {
      res.end()
    });

    app.use((req, res) => {
      res.redirect('/');
    });
}
