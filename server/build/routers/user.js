"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const UserController_1 = tslib_1.__importDefault(require("../controllers/UserController"));
const Roles_1 = tslib_1.__importDefault(require("../utils/Roles"));
exports.default = express_1.Router()
    /**
     * Register
     */
    .post('/', (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role = Roles_1.default.CITIZEN } = request.body;
    try {
        const user = (yield UserController_1.default.register(username, password, role)).toObject();
        // hide password and __v manually
        delete user.password;
        delete user.__v;
        response.send(user);
    }
    catch ({ message }) {
        response.status(400).send({ message });
    }
}))
    /**
     * List all users with their online status
     */
    .get('/', (_, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserController_1.default.listUsers();
    response.send(users);
}));
//# sourceMappingURL=user.js.map