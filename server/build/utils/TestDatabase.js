"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.connect = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Database = tslib_1.__importStar(require("./Database"));
exports.connect = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // ensure that a brand new database is used each time
    // in case the previous database may not be properly dropped on some machines
    const time = new Date().getTime().toString().slice(8, 14);
    const random = Math.round(Math.random() * 100000);
    const testDBURL = `mongodb://localhost:27017/incident-response-test-${time}-${random}`;
    yield Database.connect(testDBURL);
});
exports.close = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.db.dropDatabase();
    yield Database.close();
});
//# sourceMappingURL=TestDatabase.js.map