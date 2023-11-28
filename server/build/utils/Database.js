"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.connect = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
// @see https://stackoverflow.com/a/27540516
// NOTE: Enforce mongoose to create dependent collections in the testing environment.
require("../models/User");
require("../models/Message");
require("../models/Channel");
exports.connect = (
// url = 'mongodb://localhost:27017/incident-response'
url = 'mongodb+srv://root:root@cluster0.cunonhp.mongodb.net/?retryWrites=true&w=majority') => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
});
exports.close = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connection.close();
});
//# sourceMappingURL=Database.js.map