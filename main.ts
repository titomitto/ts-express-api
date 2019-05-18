import 'universal-dotenv';
import 'module-alias/register';
import 'express-async-errors';
import 'express-router-group'
import bodyParser from "body-parser";
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import exceptionHandler from 'app/exceptions';
import cors from 'cors';
import { syncDB } from 'db';

const app = express();
const port = process.env.PORT || 3030;


app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true}));
app.use(logger('dev'));
app.use(exceptionHandler);


app.listen(3030, () => {
    let message = `Listening on port ${port}`
    console.log(message);
    syncDB();
});
