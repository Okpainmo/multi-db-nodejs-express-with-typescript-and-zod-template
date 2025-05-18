import bcrypt from 'bcryptjs';
// import log from './logger.js';
export const decryptHandler = async ({ stringToCompare, hashedString }) => {
    const isMatch = await bcrypt.compare(stringToCompare, hashedString);
    // log.info(isMatch)
    return isMatch;
};
