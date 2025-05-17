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
