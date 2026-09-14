const responeMiddlware = (req, res, next) => {
    res.success = ( message, data = null, statusCode = 200 ) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    };

    res.error = (message, errorCode = "E-SV", statusCode = 500) => {
        return res.status(statusCode).json({
            success: false,
            message,
            errorCode
        });
    };

    next();
};

module.exports = responeMiddlware;