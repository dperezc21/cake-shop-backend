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