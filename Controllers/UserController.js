const UserModel = require('../Models/User');
const CatchAsync = require('../utils/CatchAsync');
const jwt = require('jsonwebtoken');
exports.create = CatchAsync(async (req, res) => {
    let token = '';
    const user = await UserModel(req.body);
    const data = await user.save();
    if (data) {
        token = jwt.sign({ id: data.id, name: data.name, email: data.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    }
    return res.status(201).json({
        statusCode: 201,
        status: 'success',
        message: 'User created successfully.',
        token,
        data
    });
});

exports.getUsers = CatchAsync((req, res) => {
    return res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Users view successfully.'
    });
});