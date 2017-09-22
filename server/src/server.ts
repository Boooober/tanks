import 'reflect-metadata';
const express = require('express');
const bodyParser = require('body-parser');

import setupEndpoints from './features/setup-endpoints';
import TheGame from './game';


const app = express();

app.use(bodyParser());
app.use(express.static('build/client'));

TheGame.init(app);
setupEndpoints(app);

app.listen(8080, () => {
    console.log('Server started :)');
});
