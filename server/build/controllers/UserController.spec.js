"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jest_mock_extended_1 = require("jest-mock-extended");
const TestDatabase = tslib_1.__importStar(require("../utils/TestDatabase"));
const UserController_1 = tslib_1.__importDefault(require("./UserController"));
const Channel_1 = tslib_1.__importDefault(require("../models/Channel"));
const Roles_1 = tslib_1.__importDefault(require("../utils/Roles"));
const Token = tslib_1.__importStar(require("../utils/Token"));
const UserConnections_1 = tslib_1.__importDefault(require("../utils/UserConnections"));
describe('User controller', () => {
    beforeAll(TestDatabase.connect);
    const username = 'test-username-1';
    const password = 'super-secret-password';
    const role = Roles_1.default.DISPATCH;
    let newUser;
    it('will register a new user', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        newUser = yield UserController_1.default.register(username, password, role);
        const users = yield UserController_1.default.listUsers();
        expect(users.length).toBe(1);
        expect(users[0]._id).toStrictEqual(newUser._id);
    }));
    it('will not register two users with the same username', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // @see https://jestjs.io/docs/en/asynchronous#promises
        expect.assertions(1);
        try {
            yield UserController_1.default.register(username, password);
        }
        catch (e) {
            expect(e.message).toBe(`User "${username}" already exists`);
        }
    }));
    it('will subscribe the new user to the public channel', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const publicChannel = yield Channel_1.default.getPublicChannel();
        const channelMembers = publicChannel.users;
        expect(channelMembers.length).toBe(1);
        expect(channelMembers[0].id).toStrictEqual(newUser.id);
    }));
    it('will allow an existing user to login', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const credential = yield UserController_1.default.login(username, password);
        expect(credential.token).toBeDefined();
        expect(Token.validate(newUser.id, credential.token)).toBeTruthy;
        expect(credential._id).toBe(newUser.id);
        expect(credential.role).toBe(role);
    }));
    it('will not allow an existing user to login if the password is incorrect', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield UserController_1.default.login(username, 'random-password');
        }
        catch (e) {
            expect(e.message).toBe(`User "${username}" does not exist or incorrect password`);
        }
    }));
    it('will not allow a non-existing user to login', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield UserController_1.default.login('non-existing-user', 'random-password');
        }
        catch (e) {
            expect(e.message).toBe('User "non-existing-user" does not exist or incorrect password');
        }
    }));
    it('will list users with their online/offline status', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // connect the previous user
        const socket = jest_mock_extended_1.mock();
        UserConnections_1.default.addUserConnection(newUser.id, socket);
        // add another user
        const citizenName = 'new-citizen';
        const citizenPassword = 'citizen-password';
        const newCitizen = yield UserController_1.default.register(citizenName, citizenPassword);
        let users = yield UserController_1.default.listUsers();
        expect(users.length).toBe(2);
        expect(users).toContainEqual({
            _id: newUser._id,
            role: newUser.role,
            username: newUser.username,
            online: true,
        });
        expect(users).toContainEqual({
            _id: newCitizen._id,
            role: newCitizen.role,
            username: newCitizen.username,
            online: false,
        });
        // double check
        UserConnections_1.default.removeUserConnection(newUser.id);
        users = yield UserController_1.default.listUsers();
        expect(users.length).toBe(2);
        expect(users).toContainEqual({
            _id: newUser._id,
            role: newUser.role,
            username: newUser.username,
            online: false,
        });
        expect(users).toContainEqual({
            _id: newCitizen._id,
            role: newCitizen.role,
            username: newCitizen.username,
            online: false,
        });
    }));
    afterAll(TestDatabase.close);
});
//# sourceMappingURL=UserController.spec.js.map