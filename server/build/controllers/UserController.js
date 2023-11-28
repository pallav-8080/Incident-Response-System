"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Token = tslib_1.__importStar(require("../utils/Token"));
const User_1 = tslib_1.__importDefault(require("../models/User"));
const Roles_1 = tslib_1.__importDefault(require("../utils/Roles"));
const Channel_1 = tslib_1.__importDefault(require("../models/Channel"));
const UserConnections_1 = tslib_1.__importDefault(require("../utils/UserConnections"));
class UserController {
    register(username, password, role = Roles_1.default.CITIZEN) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.default.findOne({ username }).exec();
            if (user) {
                throw new Error(`User "${username}" already exists`);
            }
            else {
                user = yield new User_1.default({
                    username,
                    password,
                    role,
                }).save();
                // subscribe to the public channel
                const publicChannel = yield Channel_1.default.getPublicChannel();
                publicChannel.users.push(user._id);
                publicChannel.save();
            }
            // NOTE: password is still visible in the user instance.
            return user;
        });
    }
    login(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ username })
                // @see https://stackoverflow.com/a/12096922
                .select('+password')
                .exec();
            if (user) {
                const isMatch = yield user.comparePassword(password);
                if (isMatch) {
                    return {
                        token: Token.generate(user.id),
                        _id: user.id,
                        role: user.role,
                    };
                }
            }
            throw new Error(`User "${username}" does not exist or incorrect password`);
        });
    }
    /**
     * List all users with their online/office status
     */
    listUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find().exec();
            return users.map(user => (Object.assign(Object.assign({}, user.toJSON()), { online: UserConnections_1.default.isUserConnected(user.id) })));
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map