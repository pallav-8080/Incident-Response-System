"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Token = tslib_1.__importStar(require("./utils/Token"));
const UserConnections_1 = tslib_1.__importDefault(require("./utils/UserConnections"));
class Socket {
    constructor() {
        this.setup = (server) => {
            server.on('connection', (socket) => {
                socket.on('login', (message) => {
                    // validate
                    if (message.uid &&
                        message.token &&
                        Token.validate(message.uid, message.token)) {
                        // save socket instance
                        UserConnections_1.default.addUserConnection(message.uid, socket);
                        socket.broadcast.emit('user-status-changed', { uid: message.uid });
                    }
                    else {
                        console.error(`Invalid login message from ${message.uid}`);
                        socket.disconnect();
                    }
                });
                socket.on('disconnect', () => {
                    const uid = UserConnections_1.default.getConnectedUsers().find(uid => UserConnections_1.default.getUserConnection(uid) === socket);
                    if (uid) {
                        UserConnections_1.default.removeUserConnection(uid);
                        socket.broadcast.emit('user-status-changed', { uid });
                    }
                });
            });
        };
    }
}
exports.default = new Socket();
//# sourceMappingURL=socket.js.map