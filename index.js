const express = require("express");
const UserRouter = require("./Routes/UserRoutes");
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
app.use('/v1/user', UserRouter);
app.listen(PORT, () => {
    console.log(`Server is connected and running on port: ${PORT}`);
});