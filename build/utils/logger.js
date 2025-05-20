import { pino } from 'pino';
import dayjs from 'dayjs';
const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
});
// Pino supports the following log levels:
// 1. `fatal`
// 2. `error`
// 3. `warn`
// 4. `info`
// 5. `debug`
// 6. `trace`
// 7. `silent` (used to disable logging)
// Usage:
// import log from './utils/logger.js';
//
// log.info('my message');
// log.error(error.message);
// ...
export default log;
