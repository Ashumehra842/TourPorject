const express = require("express");
const mongoose = require('mongoose');
const UserRouter = require("./Routes/UserRoutes");
const AppError = require("./ErrorHandler/appError");
const errorHandler = require("./ErrorHandler/errorHandler");
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log(`DB Connected successfuly.`);
}).catch(err => {
    console.log(`failed to connect with database`);
});

app.use('/v1/user/', UserRouter);

app.all(/.*/, (req, res, next) => {

    next(new AppError(`The route you are trying to access is not found ${req.originalUrl}`, 404));
});
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is connected and running on port: ${PORT}`);
});