"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const routers_1 = tslib_1.__importDefault(require("./routers"));
exports.default = express_1.default()
    .use(body_parser_1.default.json())
    .use('/api', routers_1.default)
    .use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'client', 'build'), {
    fallthrough: true,
}))
    // Fix static file serving in FireFox.
    .use('*', express_1.default.static(path_1.default.join(__dirname, '..', '..', 'client', 'build', 'index.html')));
//# sourceMappingURL=app.js.map