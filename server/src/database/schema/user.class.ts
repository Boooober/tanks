import {
    PlayerUnit,
    DEFAULT_UNIT_OPTIONS,
    PlayerStatistics
} from 'Core';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const User = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: false,  },
    password: { type: String, required: true },
    statistics: {
        score: { type: Number, default: 0 },
        totalShoots: { type: Number, default: 0 },
        successShoots: { type: Number, default: 0 },
        totalDamage: { type: Number, default: 0 },
        receivedDamage: { type: Number, default: 0 }
    },
    unit: {
        color: { type: Object, default: DEFAULT_UNIT_OPTIONS.color },
        speed: { type: Number, default: DEFAULT_UNIT_OPTIONS.speed },
        width: { type: Number, default: DEFAULT_UNIT_OPTIONS.width },
        height: { type: Number, default: DEFAULT_UNIT_OPTIONS.height },
        health: { type: Number, default: DEFAULT_UNIT_OPTIONS.health },
        attackPower: { type: Number, default: DEFAULT_UNIT_OPTIONS.attackPower },
        attackSpeed: { type: Number, default: DEFAULT_UNIT_OPTIONS.attackSpeed },
        rotateSpeed: { type: Number, default: DEFAULT_UNIT_OPTIONS.rotateSpeed }
    }
});

function noop() {}

User.methods.hashPassword = function (password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validatePassword = function(password: string): string {
    return bcrypt.compareSync(password, this.password);
};

User.statics.saveObject = function(userId: string, object: PlayerUnit, callback: Function): void {
    const { speed, width, height, health, attackPower, attackSpeed, rotateSpeed, color } = object;
    const unit = { speed, width, height, health, attackPower, attackSpeed, rotateSpeed, color };
    this.update({ _id: userId }, { $set: { unit } }, { upsert: true }, (e, u) => (callback || noop)(e, u));
};

User.statics.incrementStats = function(userId: string, data: PlayerStatistics, callback: Function): void {
    const statistics = Object.keys(data).reduce((stats: Object, key: string): Object => {
        stats[`statistics.${key}`] = data[key];
        return stats;
    }, {});
    this.update({ _id: userId }, { $inc: statistics }, { upsert: true }, (e, u) => (callback || noop)(e, u));
};

User.path('password').validate(pass => pass.length > 5 && pass.length < 70);

export const UserModel = mongoose.model('User', User);
