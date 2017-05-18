export { UserModel } from './schema/user.class';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tanx_database');
const db = mongoose.connection;
