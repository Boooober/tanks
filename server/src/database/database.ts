import { getMongo } from '../../../config';
export { UserModel } from './schema/user.class';

const mongoose = require('mongoose');

mongoose.connect(getMongo());
export const DB = mongoose.connection;

DB.once('open', () => {
    console.log('Connected to DB!');
});

DB.on('error', err => {
    console.log('Connection error:', err.message);
});
