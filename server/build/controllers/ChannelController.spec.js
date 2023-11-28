"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jest_mock_extended_1 = require("jest-mock-extended");
const ChannelController_1 = tslib_1.__importDefault(require("./ChannelController"));
const TestDatabase = tslib_1.__importStar(require("../utils/TestDatabase"));
const Channel_1 = tslib_1.__importStar(require("../models/Channel"));
const UserController_1 = tslib_1.__importDefault(require("./UserController"));
const UserConnections_1 = tslib_1.__importDefault(require("../utils/UserConnections"));
describe('Channel controller', () => {
    let userA;
    let userB;
    let userC;
    let channel;
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        TestDatabase.connect();
        userA = yield UserController_1.default.register('Channel-User-A', 'password-A');
        userB = yield UserController_1.default.register('Channel-User-B', 'password-B');
        userC = yield UserController_1.default.register('Channel-User-C', 'password-C');
    }));
    it('will not allow to create the public channel manually', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield ChannelController_1.default.create({
                name: Channel_1.PUBLIC_CHANNEL_NAME,
                userIds: [],
            });
        }
        catch (e) {
            expect(e.message).toBe('Unauthorized');
        }
    }));
    it('will create a new channel given users and channel name', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        channel = yield ChannelController_1.default.create({
            userIds: [userA._id, userB._id],
        });
        expect(channel.name).not.toBeDefined();
        expect(channel.users.length).toBe(2);
        expect(channel.messages.length).toBe(0);
    }));
    it('will return the existing channel if users are essentially the same', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const newChannel = yield ChannelController_1.default.create({
            userIds: [userB._id, userA._id],
        });
        expect(newChannel.id).toEqual(channel.id);
    }));
    it('can list all existing channels', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const result = yield ChannelController_1.default.list();
        expect(result.length).toBe(2);
        expect(result[0].name).toEqual('Public');
        expect(result[0].users.length).toBe(3);
        // hide messages when listing all channels
        expect(result[0].messages).not.toBeDefined();
        expect(result[1].name).not.toBeDefined();
        expect(result[1].users.length).toBe(2);
        expect(result[1].messages).not.toBeDefined();
    }));
    it('can list channels which a user joined', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const result = yield ChannelController_1.default.list(userC._id);
        expect(result.length).toBe(1);
        expect(result[0].name).toEqual('Public');
    }));
    it('can get a channel by id', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const publicChannel = yield Channel_1.default.getPublicChannel();
        const channel = yield ChannelController_1.default.get(publicChannel._id);
        expect(channel.name).toBe(Channel_1.PUBLIC_CHANNEL_NAME);
    }));
    it('can post a new message to the channel and notify others', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // setup connections
        const socketA = jest_mock_extended_1.mock();
        const socketB = jest_mock_extended_1.mock();
        UserConnections_1.default.addUserConnection(userA.id, socketA);
        UserConnections_1.default.addUserConnection(userB.id, socketB);
        // userA post a message to the public channel
        const publicChannel = yield Channel_1.default.getPublicChannel();
        const content = 'here is a new message';
        const message = yield ChannelController_1.default.appendMessage({
            content,
            senderId: userA._id,
            channelId: publicChannel._id,
        });
        expect(message.content).toBe(content);
        expect(message.sender._id).toEqual(userA._id);
        expect(message.channelId).toEqual(publicChannel._id);
        // verify that the message has been forwarded to others in the channel
        expect(socketB.emit).toHaveBeenCalledWith('new-message', message);
        expect(socketA.emit).not.toHaveBeenCalled();
    }));
    afterAll(TestDatabase.close);
});
//# sourceMappingURL=ChannelController.spec.js.map