"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TestDatabase = tslib_1.__importStar(require("../utils/TestDatabase"));
const Channel_1 = tslib_1.__importStar(require("./Channel"));
describe('Channel model', () => {
    beforeAll(TestDatabase.connect);
    it('will create the public channel since it does not exist', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // prove that there is no channel
        expect(yield Channel_1.default.find().exec()).toEqual([]);
        const publicChannel = yield Channel_1.default.getPublicChannel();
        const channels = yield Channel_1.default.find().exec();
        expect(channels.length).toBe(1);
        expect(channels[0].id).toBe(publicChannel.id);
        expect(publicChannel.name).toBe(Channel_1.PUBLIC_CHANNEL_NAME);
    }));
    it('will return the existing public channel', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const channels = yield Channel_1.default.find().exec();
        // prove that there is already a public channel
        expect(channels.length).toBe(1);
        const publicChannel = yield Channel_1.default.getPublicChannel();
        // prove that no new channels are created
        expect(yield Channel_1.default.find().exec()).toStrictEqual(channels);
        expect(channels[0].id).toBe(publicChannel.id);
    }));
    afterAll(TestDatabase.close);
});
//# sourceMappingURL=Channel.spec.js.map