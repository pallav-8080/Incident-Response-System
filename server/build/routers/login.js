"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const UserController_1 = tslib_1.__importDefault(require("../controllers/UserController"));
exports.default = express_1.Router()
    /**
     * Login
     */
    .post('/', (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    try {
        const result = yield UserController_1.default.login(username, password);
        response.send(result);
    }
    catch ({ message }) {
        response.status(400).send({ message });
    }
}));
//# sourceMappingURL=login.js.map