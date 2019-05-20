import 'module-alias/register';
import 'universal-dotenv';
import 'express-async-errors';
import 'express-router-group'
import bodyParser from "body-parser";
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import exceptionHandler from 'app/exceptions';
import cors from 'cors';
import { syncDB } from 'db';
import router from 'app/routes';
import sockets from 'app/sockets';


const app = express();
const port = process.env.PORT || 3030;
const http = require("http").Server(app);
const io = require("socket.io")(http);


app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true}));
app.use(logger('dev'));
app.use(exceptionHandler);
app.use(router);
sockets(io);

http.listen(port, () => {
    let message = `Listening on port ${port}`
    console.log(message);
    syncDB();
});
