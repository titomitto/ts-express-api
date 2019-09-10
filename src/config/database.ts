import { SyncOptions } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
import { User, ResetToken, Config } from "app/models";

// Database models
export const models = [
  User,
  ResetToken,
  Config
];

// Sync options
export const syncOptions: SyncOptions = {
  alter: false,
  force: false,
  logging: false
};


export default {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE_PATH,
  port: Number(process.env.DB_PORT),
  timezone: "+03:00"
} as SequelizeOptions;
