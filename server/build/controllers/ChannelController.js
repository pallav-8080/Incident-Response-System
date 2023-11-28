"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Channel_1 = tslib_1.__importStar(require("../models/Channel"));
const User_1 = tslib_1.__importDefault(require("../models/User"));
const Message_1 = tslib_1.__importDefault(require("../models/Message"));
const UserConnections_1 = tslib_1.__importDefault(require("../utils/UserConnections"));
class ChannelController {
    constructor() {
        this.create = (channel) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (channel.name === Channel_1.PUBLIC_CHANNEL_NAME) {
                throw new Error('Unauthorized');
            }
            // remove duplicates and ensure order
            const userIds = Array.from(new Set(channel.userIds)).sort((a, b) => a.toHexString().localeCompare(b.toHexString()));
            const users = yield Promise.all(userIds.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (yield User_1.default.findById(id).exec()); })));
            const exists = yield Channel_1.default.findOne({
                users,
                name: {
                    $ne: Channel_1.PUBLIC_CHANNEL_NAME,
                },
            }).exec();
            if (exists) {
                return exists;
            }
            else {
                return new Channel_1.default({
                    name: channel.name,
                    users,
                }).save();
            }
        });
        /**
         * List channels.
         *
         * @param hasUser If specified, the function will only list
         *                channels that the user joined.
         *                Otherwise, all channels will be returned.
         */
        this.list = (hasUser) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (hasUser) {
                const user = yield User_1.default.findById(hasUser).exec();
                if (user) {
                    query = {
                        users: user,
                    };
                }
            }
            return (Channel_1.default.find(query)
                // hide messages when listing all channels
                .select('-messages')
                .exec());
        });
        this.get = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () { return Channel_1.default.findById(id).exec(); });
        /**
         * Post a new message to the channel,
         * and notify others in the channel who are currently online.
         *
         * @returns the newly posted message
         */
        this.appendMessage = ({ content, senderId, channelId, }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const sender = yield User_1.default.findById(senderId).exec();
            if (!sender) {
                throw new Error(`Sender(${senderId.toHexString()}) not found.`);
            }
            const channel = yield Channel_1.default.findById(channelId).exec();
            if (!channel) {
                throw new Error(`Channel(${channelId.toHexString()}) not found.`);
            }
            const message = yield new Message_1.default({
                content,
                sender,
                channelId: channel._id,
            }).save();
            channel.messages.push(message);
            channel.save();
            // notify others
            channel.users.forEach(user => {
                if (user._id.equals(senderId))
                    return;
                const id = user._id.toHexString();
                if (!UserConnections_1.default.isUserConnected(id))
                    return;
                const connection = UserConnections_1.default.getUserConnection(id);
                connection.emit('new-message', message);
            });
            return message;
        });
        this.getMessages = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // TODO:
            throw new Error('Not Implemented');
        });
    }
}
exports.default = new ChannelController();
//# sourceMappingURL=ChannelController.js.map