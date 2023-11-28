"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const mongoose_autopopulate_1 = tslib_1.__importDefault(require("mongoose-autopopulate"));
const MessageSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
        autopopulate: {
            select: '-password -__v',
        },
    },
    channelId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Channel',
        autopopulate: false,
    },
}, {
    timestamps: {
        createdAt: 'timestamp',
        updatedAt: false,
    },
});
MessageSchema.plugin(mongoose_autopopulate_1.default);
exports.default = mongoose_1.default.model('Message', MessageSchema);
//# sourceMappingURL=Message.js.map