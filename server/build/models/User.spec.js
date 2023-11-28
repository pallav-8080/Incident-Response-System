"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TestDatabase = tslib_1.__importStar(require("../utils/TestDatabase"));
const User_1 = tslib_1.__importDefault(require("./User"));
describe('User model', () => {
    beforeAll(TestDatabase.connect);
    const createTestUser = (username, password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const rawUser = yield new User_1.default({
            username,
            password,
        });
        return rawUser.save();
    });
    it("will encrypt user's password", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const rawUser = yield createTestUser('User-1', 'password');
        expect(rawUser.password).toBeDefined();
        expect(rawUser.password).not.toEqual('password');
    }));
    it('will hide passwords and versions in queries', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const users = yield User_1.default.find().exec();
        expect(users.length).toBe(1);
        const user = users[0];
        expect(user.password).not.toBeDefined();
        expect(user.__v).not.toBeDefined();
    }));
    it('compares clear-text password with encrypted password', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const rawUser = yield createTestUser('User-2', 'password');
        expect(yield rawUser.comparePassword('some random string')).toBeFalsy();
        expect(yield rawUser.comparePassword('password')).toBeTruthy();
    }));
    afterAll(TestDatabase.close);
});
//# sourceMappingURL=User.spec.js.map