"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("app/models");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield models_1.User.find({
                where: {
                    email
                }
            });
            if (!user) {
                return res.status(402).json({
                    success: false,
                    field: "email",
                    message: "Incorrect credentials"
                });
            }
            let userPassword = user.password.replace("$2y$", "$2a$");
            if (yield bcrypt_1.default.compare(password, userPassword)) {
                return res.status(402).json({
                    success: false,
                    field: "password",
                    message: "Incorrect credentials"
                });
            }
        });
    }
    static recoverPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield models_1.User.find({
                where: {
                    email
                }
            });
            return res.status(402).json({
                success: false,
                field: "password",
                message: "Incorrect credentials"
            });
        });
    }
}
exports.AuthController = AuthController;
