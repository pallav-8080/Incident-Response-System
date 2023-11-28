"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const ChannelController_1 = tslib_1.__importDefault(require("../controllers/ChannelController"));
const Channel_1 = tslib_1.__importDefault(require("../models/Channel"));
exports.default = express_1.Router()
    /**
     * Create a new channel
     */
    .post('/', (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { name, users } = request.body;
    try {
        const channel = yield ChannelController_1.default.create({
            name,
            userIds: users.map(userId => mongoose_1.Types.ObjectId(userId)),
        });
        response.send(channel);
    }
    catch ({ message }) {
        response.status(403).send({ message });
    }
}))
    /**
     * List channels
     */
    .get('/', (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = request.query['user'];
    const channels = yield ChannelController_1.default.list(user ? mongoose_1.Types.ObjectId(user) : undefined);
    response.send(channels);
}))
    .post('/public/messages', (_, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const publicChannel = yield Channel_1.default.getPublicChannel();
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308
    return response.redirect(308, `/api/channels/${publicChannel.id}/messages`);
}))
    /**
     * Append a new message into the channel
     */
    .post('/:id/messages', (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const senderId = mongoose_1.Types.ObjectId(request.headers['x-application-uid']);
    const { content } = request.body;
    const channelId = mongoose_1.Types.ObjectId(request.params.id);
    try {
        const message = yield ChannelController_1.default.appendMessage({
            content,
            senderId,
            channelId,
        });
        response.send(message);
    }
    catch (message) {
        response.status(404).send({ message });
    }
}))
    .get('/public/messages', (_, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const publicChannel = yield Channel_1.default.getPublicChannel();
    return response.redirect(`/api/channels/${publicChannel.id}/messages`);
}))
    /**
     * List messages in the channel
     */
    .get('/:id/messages', (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id: channelId } = request.params;
    const channel = yield ChannelController_1.default.get(mongoose_1.Types.ObjectId(channelId));
    if (!channel) {
        return response
            .status(404)
            .send({ message: `Channel(${channelId}) not found.` });
    }
    return response.send(channel.messages);
}));
//# sourceMappingURL=channel.js.map