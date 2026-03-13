const CatchAsync = require("../utils/CatchAsync");
const UserModel = require('../Models/User');
const AppErrors = require("../ErrorHandler/appError");
const jwt = require('jsonwebtoken');
exports.Login = CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppErrors(`Please provider a valid email and password.`, 400));
    }
    const user = await UserModel.findOne({ email: email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppErrors(`Inncorrect email and password.`, 401));
    }
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.status(200).json({
        status: 'success',
        message: 'User LoggedIn successfully',
        token,
        data:user
    });
});