"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortId = exports.urlSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.urlSchema = zod_1.default.object({
    originalUrl: zod_1.default.string().url().min(1),
});
exports.shortId = zod_1.default.object({
    shortId: zod_1.default.string()
});
