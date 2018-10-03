import { model, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

import { DEFAULT_UNIT_OPTIONS, PlayerStatistics, PlayerUnit } from '../../game/core/player/entity';

const user = new Schema({
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

function noop(): void {}

user.methods.hashPassword = function(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

user.methods.validatePassword = function(password: string): string {
    return bcrypt.compareSync(password, this.password);
};

user.statics.saveObject = function(userId: string, object: PlayerUnit, callback: (...args: any[]) => any): void {
    const { speed, width, height, health, attackPower, attackSpeed, rotateSpeed, color } = object;
    const unit = { speed, width, height, health, attackPower, attackSpeed, rotateSpeed, color };
    this.update({ _id: userId }, { $set: { unit } }, { upsert: true }, (e, u) => (callback || noop)(e, u));
};

user.statics.incrementStats = function(userId: string, data: PlayerStatistics, callback: (...args: any[]) => any): void {
    const statistics = Object.keys(data).reduce((stats: object, key: string): object => {
        stats[`statistics.${key}`] = data[key];
        return stats;
    }, {});
    this.update({ _id: userId }, { $inc: statistics }, { upsert: true }, (e, u) => (callback || noop)(e, u));
};

user.path('password').validate((password: string) => password.length > 5 && password.length < 70);

export const UserModel = model('User', user);
