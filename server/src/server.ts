const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

import setupEndpoints from './features/setup-endpoints';
import setupWebsockets from './features/setup-websockets';
import setupGameLoop from './features/setup-game-loop';

const app = express();

app.use(logger('dev'));
app.use(bodyParser());
app.use(express.static('build/client'));

setupEndpoints(app);
setupWebsockets(app);
setupGameLoop();

app.listen(8080, () => {
    console.log('Server started :)');
});
