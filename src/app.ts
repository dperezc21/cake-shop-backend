import express = require('express');
import cors = require('cors');
import connectionDataBase from "./db/connection";
import authRouter from './routers/auth-user.router';
import cakeRouter from './routers/cake.router';
import organizationRouter from './routers/organization.router';
import userRoleRouter from './routers/user-rol.router';
import userRouter from './routers/user.router';
import {CreateTablesDb} from "./db/create-tables.db";
import {PORT} from "./config";
import VerifyRecordMiddleware from "./middleware/verify-record.middleware";

const { verifyOrganizationExists } = new VerifyRecordMiddleware();
const createTables = new CreateTablesDb();

connectionDataBase.connect();
createTables.creatingTablesDB().catch(console.error);
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cakes',[verifyOrganizationExists], cakeRouter);
app.use('/org', organizationRouter);
app.use('/roles', userRoleRouter);

app.get('/', (req, res) => {
    res.send("hola");
});

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}!`);
});