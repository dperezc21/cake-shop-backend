import express = require('express');
import cors = require('cors');
import connectionMysql = require('./db/connection');
import authRouter from './routers/auth-user.router';
import cakeRouter from './routers/cake.router';
import organizationRouter from './routers/organization.router';
import {createUserTable} from "./models/user.model";
import {createCakeTable} from "./models/cake.model";
import {createCakeImageTable} from "./models/cake-image.model";
import {createOrganizationTable} from "./models/organization.model";

connectionMysql.connect();
createOrganizationTable().then();
console.log("CREANDO TABLA ORGANIZACION")
createUserTable().then();
console.log("CREANDO TABLA USUARIO")
createCakeTable().then();
console.log("CREANDO TABLA CAKE")
createCakeImageTable().then();
console.log("CREANDO TABLA CAKE IMAGE")

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/cakes', cakeRouter);
app.use('/org', organizationRouter);

app.get('/', (req, res) => {
    res.send("hola");
})

app.listen(3000, () => {
    console.log("Listening on port http://localhost:3000!");
});