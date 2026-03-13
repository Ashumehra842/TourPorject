const sendErrorToDev = (err, req, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack

    });
}


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorToDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorToDev(err, req, res);
    }
}