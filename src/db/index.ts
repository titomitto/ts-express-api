import fs from "fs";
import chalk from "chalk";
import { Sequelize } from "sequelize-typescript";
import dbConfig, { syncOptions } from "config/database";


const db = new Sequelize(dbConfig);

db.addModels([

]);

export const syncDB = ()=>{
    return db.sync(syncOptions)
        .then(() => {
            let message = "Database connection successful";
            console.log(chalk.green(message));
        })
        .catch(e => {
            console.error(chalk.red(e));
        });
}

export default db;
