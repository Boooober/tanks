import { MONGO_DATABASE } from '../../../config/config';
export { UserModel } from './schema/user.class';

const mongoose = require('mongoose');

mongoose.connect(MONGO_DATABASE);
export const DB = mongoose.connection;

DB.once('open', () => {
    console.log('Connected to DB!');
});

DB.on('error', err => {
    console.log('Connection error:', err.message);
});
