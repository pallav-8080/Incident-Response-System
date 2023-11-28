"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jest_mock_extended_1 = require("jest-mock-extended");
const UserConnections_1 = tslib_1.__importDefault(require("./UserConnections"));
const TestDatabase = tslib_1.__importStar(require("./TestDatabase"));
describe('UserConnections', () => {
    beforeAll(TestDatabase.connect);
    const uid = 'fake-uid';
    const socket = jest_mock_extended_1.mock();
    it('can return user online correctly', () => {
        UserConnections_1.default.addUserConnection(uid, socket);
        const connected = UserConnections_1.default.isUserConnected(uid);
        const notConnected = UserConnections_1.default.isUserConnected('nonexist');
        expect(connected).toBe(true);
        expect(notConnected).toBe(false);
    });
    it('can list ids of all connected users', () => {
        UserConnections_1.default.addUserConnection(uid, socket);
        const uids = UserConnections_1.default.getConnectedUsers();
        expect(uids.length).toBe(1);
        expect(uids[0]).toBe(uid);
    });
    afterAll(TestDatabase.close);
});
//# sourceMappingURL=UserConnections.spec.js.map