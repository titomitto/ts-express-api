"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_1 = __importDefault(require("app/events"));
const router = express_1.Router();
router.use("/", (req, res) => {
    events_1.default.emit('new:user', "Tito Mordeccai");
    return res.json({
        success: true,
        message: "Welcome to the best api starter"
    });
});
router.use("**", (req, res) => {
    return res.status(400).json({
        success: false,
        message: "Requested resource not found."
    });
});
exports.default = router;
