"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Token = tslib_1.__importStar(require("./Token"));
describe('Token', () => {
    const uid = mongoose_1.default.Types.ObjectId().toHexString();
    let token;
    it('can generate a valid token', () => {
        token = Token.generate(uid);
        // not null
        expect(token).toMatch(/.+/);
    });
    it('can accpect a valid token', () => {
        expect(Token.validate(uid, token)).toBeTruthy();
    });
    it('will reject an invalid token', () => {
        expect(Token.validate(uid, 'some-random-token')).toBeFalsy();
    });
});
//# sourceMappingURL=Token.spec.js.map