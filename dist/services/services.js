"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortId = generateShortId;
function generateShortId(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}
