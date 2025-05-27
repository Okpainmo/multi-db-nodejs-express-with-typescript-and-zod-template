import log from '../utils/logger.js';
/**
 * Request Duration Logging Middleware
 *
 * This middleware tracks and logs the duration of each HTTP request processed by the application.
 * It measures the time between when a request starts and when it completes, providing
 * valuable insights into request processing times and potential performance bottlenecks.
 *
 * The middleware:
 * 1. Records the start time when a request begins processing
 * 2. Calculates the total duration when the request completes
 * 3. Logs both the start and end of each request with timing information
 */
export const requestDurationLogging = (req, res, next) => {
    const startTime = Date.now();
    const path = req.path;
    // Log request start
    log.info(`...................................`);
    log.info(`Request started: ${req.method} ${path}`);
    // Add listener for when the response is finished
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        log.info(`Request finished: ${req.method} ${path} (duration: ${duration}ms)`);
        log.info(`...................................`);
    });
    next();
};
