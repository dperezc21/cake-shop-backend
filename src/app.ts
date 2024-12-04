import express = require('express');
import cors = require('cors');
import connectionMysql = require('./db/connection');
import authRouter from './routers/auth-user.router';
import cakeRouter from './routers/cake.router';
import organizationRouter from './routers/organization.router';
import {CreateTablesDb} from "./db/create-tables.db";
import {PORT} from "./config";

const createTables = new CreateTablesDb();

connectionMysql.connect();
createTables.creatingTablesDB().catch(console.error);
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/cakes', cakeRouter);
app.use('/org', organizationRouter);

app.get('/', (req, res) => {
    res.send("hola");
})

app.listen(PORT, () => {
    console.log("Listening on port http://localhost:3000!");
});