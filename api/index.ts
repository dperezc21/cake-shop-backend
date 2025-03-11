import express = require('express');
import cors = require('cors');
import connectionDataBase from "../src/db/connection";
import authRouter from '../src/routers/auth-user.router';
import cakeRouter from '../src/routers/cake.router';
import organizationRouter from '../src/routers/organization.router';
import userRoleRouter from '../src/routers/user-rol.router';
import userRouter from '../src/routers/user.router';
import {CreateTablesDb} from "../src/db/create-tables.db";
import {PORT} from "../src/config";
import VerifyRecordMiddleware from "../src/middleware/verify-record.middleware";

const { verifyOrganizationExists } = new VerifyRecordMiddleware();
const createTables = new CreateTablesDb();

connectionDataBase.connect();
createTables.creatingTablesDB().catch(console.error);
const index = express();

index.use(express.json());
index.use(cors());

index.use('/auth', authRouter);
index.use('/users', [verifyOrganizationExists], userRouter);
index.use('/cakes', [verifyOrganizationExists], cakeRouter);
index.use('/org', organizationRouter);
index.use('/roles', userRoleRouter);

index.get('/', (req, res) => {
    res.send("welcome");
});

index.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}!`);
});