const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

User.path('password').validate(pass => pass.length > 5 && pass.length < 70);

export const UserModel = mongoose.model('User', User);
