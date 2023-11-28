"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../app"));
const TestDatabase = tslib_1.__importStar(require("../utils/TestDatabase"));
const UserController_1 = tslib_1.__importDefault(require("../controllers/UserController"));
const Roles_1 = tslib_1.__importDefault(require("../utils/Roles"));
const Token = tslib_1.__importStar(require("../utils/Token"));
describe('Router - Login', () => {
    const username = 'some-username';
    const password = 'some-password';
    const role = Roles_1.default.POLICE;
    let user;
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield TestDatabase.connect();
        user = yield UserController_1.default.register(username, password, role);
    }));
    it('rejects invalid username', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post('/api/login')
            .send({
            username: 'non-exist-user',
            password,
        })
            .expect(400, {
            message: 'User "non-exist-user" does not exist or incorrect password',
        });
    }));
    it('rejects incorrect password', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post('/api/login')
            .send({
            username,
            password: 'fake-password',
        })
            .expect(400, {
            message: 'User "some-username" does not exist or incorrect password',
        });
    }));
    it('logs in the user with correct username and password', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield supertest_1.default(app_1.default)
            .post('/api/login')
            .send({
            username,
            password,
        })
            .expect(200);
        expect(body).toMatchObject({
            token: /.+/,
            _id: user.id,
            role,
        });
        expect(body).not.toHaveProperty('password');
        expect(Token.validate(user.id, body.token)).toBeTruthy();
    }));
    afterAll(TestDatabase.close);
});
//# sourceMappingURL=login.spec.js.map