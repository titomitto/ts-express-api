"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("app/events"));
exports.default = (io) => {
    io.on("connection", function (socket) {
        events_1.default.on('new:user', (userName) => {
            socket.emit('name-ok', `Hello ${userName}, how have you been?`);
            socket.on('disconnect', () => console.log("Disconnected"));
        });
    });
};
