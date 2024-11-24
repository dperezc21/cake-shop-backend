import express = require('express');
import cors = require('cors');
import connectionMysql = require('./db/connection');
import authRouter from './routers/auth-user.router';
import cakeRouter from './routers/cake.router';
import {createUserTable} from "./models/user.model";
import {createCakeTable} from "./models/cake.model";
import {createCakeImageTable} from "./models/cake-image.model";

connectionMysql.connect();
createUserTable().then();
createCakeTable().then();
createCakeImageTable().then();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/cakes', cakeRouter);

app.get('/', (req, res) => {
    res.send("hola");
})

app.listen(3000, () => {
    console.log("Listening on port http://localhost:3000!");
});