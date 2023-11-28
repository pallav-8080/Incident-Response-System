"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app_1 = tslib_1.__importDefault(require("./app"));
const socket_1 = tslib_1.__importDefault(require("./socket"));
const Database = tslib_1.__importStar(require("./utils/Database"));
const PORT = parseInt(process.env.PORT || '3001');
const server = new http_1.Server(app_1.default);
const socketIO = new socket_io_1.Server({
    // @see https://socket.io/docs/v3/handling-cors/
    cors: {
        origin: '*',
        credentials: true,
    },
}).attach(server);
Database.connect();
socket_1.default.setup(socketIO);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
//# sourceMappingURL=index.js.map