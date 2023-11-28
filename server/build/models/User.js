"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const Roles_1 = tslib_1.__importDefault(require("../utils/Roles"));
const SALT_WORK_FACTOR = 10;
// @see https://mongoosejs.com/docs/deprecations.html#ensureindex
mongoose_1.default.set('useCreateIndex', true);
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    // hide password in queries
    password: { type: String, required: true, select: false },
    role: { type: String, required: true, default: Roles_1.default.CITIZEN },
    // hide version field in queries
    __v: { type: Number, select: false },
});
// @see https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.pre('save', function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();
    // generate a salt
    bcrypt_1.default.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err)
            return next(err);
        // hash the password using our new salt
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(candidatePassword, this.password, (error, isMatch) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(isMatch);
            }
        });
    });
};
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map