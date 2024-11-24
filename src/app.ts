import express = require('express');
import connectionMysql = require('./db/connection');
import authRouter from './routers/auth-user.router';
import {createUserTable} from "./models/user.model";

connectionMysql.connect();
createUserTable().then();

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send("hola");
})

app.listen(3000, () => {
    console.log("Listening on port http://localhost:3000!");
});