"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importStar(require("config/database"));
const db = new sequelize_typescript_1.Sequelize(database_1.default);
db.addModels(database_1.models);
exports.syncDB = () => {
    return db.sync(database_1.syncOptions)
        .then(() => {
        let message = "Database connection successful";
        console.log(chalk_1.default.green(message));
    })
        .catch(e => {
        console.error(chalk_1.default.red(e));
    });
};
exports.default = db;
