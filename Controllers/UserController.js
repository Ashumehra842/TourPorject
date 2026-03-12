export const getUsers = (req, res) => {
    return res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Users view successfully.'
    }); 
}