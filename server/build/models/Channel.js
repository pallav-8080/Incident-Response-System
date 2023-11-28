"use strict";
/**
 * A channel is an abstraction where a group of users can send messages.
 * Consider it as a mimic of Slack Channel.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_CHANNEL_NAME = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const mongoose_autopopulate_1 = tslib_1.__importDefault(require("mongoose-autopopulate"));
exports.PUBLIC_CHANNEL_NAME = 'Public';
const ChannelSchema = new mongoose_1.Schema({
    name: { type: String },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            autopopulate: {
                select: '-password -__v',
            },
        },
    ],
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: 'Message',
            autopopulate: true,
        },
    ],
});
ChannelSchema.plugin(mongoose_autopopulate_1.default);
ChannelSchema.statics.getPublicChannel = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const channel = yield Channel.findOne({ name: exports.PUBLIC_CHANNEL_NAME }).exec();
    if (channel) {
        return channel;
    }
    else {
        return new Channel({ name: exports.PUBLIC_CHANNEL_NAME }).save();
    }
});
const Channel = mongoose_1.default.model('Channel', ChannelSchema);
exports.default = Channel;
//# sourceMappingURL=Channel.js.map