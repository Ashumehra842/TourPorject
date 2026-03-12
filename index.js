const express = require("express");
const mongoose = require('mongoose');
const UserRouter = require("./Routes/UserRoutes");
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;


mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log(`DB Connected successfuly.`);
}).catch(err => {
    console.log(`failed to connect with database`);
});

app.use('/v1/user', UserRouter);
app.listen(PORT, () => {
    console.log(`Server is connected and running on port: ${PORT}`);
});