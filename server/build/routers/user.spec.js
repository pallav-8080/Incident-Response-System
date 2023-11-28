"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../app"));
const TestDatabase = tslib_1.__importStar(require("../utils/TestDatabase"));
const Roles_1 = tslib_1.__importDefault(require("../utils/Roles"));
describe('Router - User', () => {
    beforeAll(TestDatabase.connect);
    const username = 'some-username';
    const password = 'some-password';
    const role = Roles_1.default.POLICE;
    const register = () => {
        return supertest_1.default(app_1.default)
            .post('/api/users')
            .send({
            username,
            password,
            role,
        });
    };
    it('can register a new user', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { body: user } = yield register().expect(200);
        expect(user).toMatchObject({
            _id: /.+/,
            username,
            role,
        });
        expect(user).not.toHaveProperty('password');
        expect(user).not.toHaveProperty('__v');
    }));
    it('will not allow to register a duplicate user', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield register().expect(400);
    }));
    it('will list all users with their online status', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield supertest_1.default(app_1.default)
            .get('/api/users')
            .expect(200);
        expect(body.length).toBe(1);
        const user = body[0];
        expect(user).toMatchObject({
            _id: /.+/,
            online: false,
            username,
            role,
        });
    }));
    afterAll(TestDatabase.close);
});
//# sourceMappingURL=user.spec.js.map