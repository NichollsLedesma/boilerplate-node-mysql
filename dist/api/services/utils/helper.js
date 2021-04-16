"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeRandom = void 0;
const getCodeRandom = (length = 12) => {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
};
exports.getCodeRandom = getCodeRandom;
//# sourceMappingURL=helper.js.map