import log from '../logger.js';
export const errorHandler__500 = (error, res) => {
    if (error instanceof Error) {
        log.error(`Error: ${error.message}`);
        res.status(500).json({
            responseMessage: 'Request was unsuccessful: internal server error',
            error: error.message
        });
    }
    else {
        log.error(`Error: ${error}`);
        res.status(500).json({
            responseMessage: 'Request was unsuccessful: internal server error',
            error: error
        });
    }
};
export const errorHandler__403 = (errorMessage, res) => {
    log.error(`Forbidden Error: ${errorMessage}`);
    res.status(403).json({
        responseMessage: errorMessage,
        error: 'FORBIDDEN'
    });
};
export const errorHandler__401 = (errorMessage, res) => {
    log.error(`Unauthorized Error: ${errorMessage}`);
    res.status(401).json({
        responseMessage: errorMessage,
        error: 'UNAUTHORIZED'
    });
};
export const errorHandler__404 = (errorMessage, res) => {
    log.error(`Not Found Error: ${errorMessage}`);
    res.status(404).json({
        responseMessage: errorMessage,
        error: 'NOT FOUND'
    });
};
export const errorHandler__400 = (errorMessage, res) => {
    log.error(`Bad Request Error: ${errorMessage}`);
    res.status(400).json({
        responseMessage: errorMessage,
        error: 'BAD REQUEST'
    });
};
