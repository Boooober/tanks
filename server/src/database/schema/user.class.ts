const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

User.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

User.path('password').validate(pass => pass.length > 5 && pass.length < 70);

export const UserModel = mongoose.model('User', User);
