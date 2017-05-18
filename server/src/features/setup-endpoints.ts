export default function setupEndpoints(app) {
    app.post('/api/login', function(req, res) {
        console.log(req.body);
        res.send('This is not implemented now');
    });

    app.post('/api/signin', function(req, res) {
        console.log(req.body);
        res.send('This is not implemented now');
    });
}
