"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const exceptionHandler = (err, req, res, next) => {
    // Handle the exception handling
    console.log(chalk_1.default.red("WE GOT A NEW ERROR"));
    console.error(err);
    res.status(500).json({
        success: false,
        message: "We got an error",
        error: err.stack.split("\n")[0],
        file: err.stack.split("\n")[1].trim() || ""
    });
};
exports.default = exceptionHandler;
