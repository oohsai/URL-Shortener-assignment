"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const db_1 = __importDefault(require("../db/db"));
const services_1 = require("../services/services");
exports.router = (0, express_1.Router)();
exports.router.post('/shorten', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = yield types_1.urlSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: 'Invalid URL' });
        return;
    }
    try {
        const shortID = yield (0, services_1.generateShortId)();
        const newUrl = yield db_1.default.uRL.create({
            data: {
                originalUrl: parsedData.data.originalUrl,
                shortId: shortID,
                clicks: 0,
            }
        });
        res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/api/v1/${newUrl.shortId}` });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Invalid Url' });
        return;
    }
}));
exports.router.get('/:shortId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let defaultUrl = yield db_1.default.uRL.findUnique({
            where: {
                shortId: req.params.shortId
            }
        });
        const updateUsage = yield db_1.default.uRL.update({
            where: {
                shortId: req.params.shortId
            },
            data: {
                clicks: { increment: 1 },
                lastAccessed: new Date(),
            }
        });
        if (!defaultUrl) {
            res.status(404).json({ error: 'Short URL not found' });
            return;
        }
        res.redirect(302, defaultUrl.originalUrl);
        return;
    }
    catch (error) {
        res.status(404).json({ error: 'Try Again' });
        return;
    }
}));
exports.router.get('/stats/:shortId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield db_1.default.uRL.findUnique({
            where: {
                shortId: req.params.shortId
            }
        });
        if (!stats) {
            res.status(404).json({ error: 'Short URL not found' });
            return;
        }
        res.status(201).json({ clicks: stats.clicks, lastAccessed: stats.lastAccessed });
        return;
    }
    catch (error) {
        res.status(500).json({ error: 'Fetch Again' });
    }
}));
