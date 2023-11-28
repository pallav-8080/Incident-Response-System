"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_1 = tslib_1.__importDefault(require("./user"));
const login_1 = tslib_1.__importDefault(require("./login"));
const channel_1 = tslib_1.__importDefault(require("./channel"));
exports.default = express_1.Router()
    .use('/users', user_1.default)
    .use('/login', login_1.default)
    .use('/channels', channel_1.default);
//# sourceMappingURL=index.js.map