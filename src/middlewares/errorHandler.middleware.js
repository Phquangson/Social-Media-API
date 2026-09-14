const errorHandlerMiddleware = ( err, req, res, next ) => {
    res.error( err.message, err.errorCode, err.statusCode );
};

module.exports = errorHandlerMiddleware;