"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connections = new Map();
class UserConnections {
    constructor() {
        this.isUserConnected = (uid) => !!connections.get(uid);
        this.addUserConnection = (uid, connection) => connections.set(uid, connection);
        this.getUserConnection = (uid) => connections.get(uid);
        this.removeUserConnection = (uid) => connections.delete(uid);
        this.getConnectedUsers = () => Array.from(connections.keys());
    }
}
exports.default = new UserConnections();
//# sourceMappingURL=UserConnections.js.map