import log from '../logger.js';
export const customServiceErrorHandler = (error) => {
    if (error instanceof Error) {
        log.error(`Error: ${error.message}`);
        throw new Error(error.message);
    }
    else {
        log.error(`Error: ${error}`);
        throw new Error('internal server error');
    }
};
