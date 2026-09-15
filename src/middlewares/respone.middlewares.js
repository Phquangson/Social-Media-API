const responeMiddlware = (req, res, next) => {
    res.success = ( data = null, message = "Thành công", statusCode = 200 ) => {
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