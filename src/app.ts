import express = require('express');
const authRouter = require('./routers/auth-user.router');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send("hola");
})

app.listen(3000, () => {
    console.log("Listening on port http://localhost:3000!");
})