import { UserModel } from '../../database/database';

export default function setupGameEndpoints(app) {
    app.get('/api/game/statistics', function (req, res) {

        UserModel.find().select('name statistics').sort('-statistics.score').exec((err, users) => {
            if (!err) {
                const data = users.map(user => Object.assign({}, user.statistics, { username: user.name }));
                return res.send({ data });
            } else {
                res.statusCode = 500;
                return res.send({ type: 'Server error' });
            }
        });
    });
}
