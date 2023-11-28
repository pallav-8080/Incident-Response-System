"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../app"));
const TestDatabase = tslib_1.__importStar(require("../utils/TestDatabase"));
const Channel_1 = require("../models/Channel");
const UserController_1 = tslib_1.__importDefault(require("../controllers/UserController"));
describe('Router - Channel', () => {
    let userA;
    let userB;
    let userC;
    let channelId;
    let messageId;
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        TestDatabase.connect();
        userA = (yield UserController_1.default.register('Channel-User-A', 'password-A'))._id.toHexString();
        userB = (yield UserController_1.default.register('Channel-User-B', 'password-B'))._id.toHexString();
        userC = (yield UserController_1.default.register('Channel-User-C', 'password-C'))._id.toHexString();
    }));
    it('creates a new channel', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { body: { _id, users }, } = yield supertest_1.default(app_1.default)
            .post('/api/channels')
            .send({
            users: [userA, userB],
        })
            .expect(200);
        expect(_id).toBeDefined();
        expect(users.length).toBe(2);
        expect(users[0].password).not.toBeDefined();
        channelId = _id;
    }));
    it('returns the existing channel if users are essentially the same', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { body: { _id, users }, } = yield supertest_1.default(app_1.default)
            .post('/api/channels')
            .send({
            users: [userB, userA],
        })
            .expect(200);
        expect(_id).toBe(channelId);
        expect(users.length).toBe(2);
    }));
    it('does not allow to create the public channel manually', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post('/api/channels')
            .send({ name: Channel_1.PUBLIC_CHANNEL_NAME, users: [] })
            .expect(403);
    }));
    it('lists existing channels', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { body: channels } = yield supertest_1.default(app_1.default)
            .get('/api/channels')
            .expect(200);
        // public channel and the newly created channel
        expect(channels.length).toBe(2);
    }));
    it('lists existing channels that a user joined', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { body: channels } = yield supertest_1.default(app_1.default)
            .get(`/api/channels?user=${userC}`)
            .expect(200);
        // only the public channel
        expect(channels.length).toBe(1);
    }));
    it('appends a new message into the channel', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const content = 'this is a simple message';
        const { body: message } = yield supertest_1.default(app_1.default)
            .post(`/api/channels/${channelId}/messages`)
            .set('x-application-uid', userA)
            .send({ content })
            .expect(200);
        messageId = message._id;
        expect(messageId).toBeDefined();
        expect(message.content).toBe(content);
        expect(message.sender._id).toBe(userA);
        expect(message.timestamp).toBeDefined();
    }));
    it('lists all messages in the channel', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { body: messages } = yield supertest_1.default(app_1.default)
            .get(`/api/channels/${channelId}/messages`)
            .expect(200);
        expect(messages.length).toBe(1);
        expect(messages[0]._id).toBe(messageId);
    }));
    afterAll(TestDatabase.close);
});
//# sourceMappingURL=channel.spec.js.map