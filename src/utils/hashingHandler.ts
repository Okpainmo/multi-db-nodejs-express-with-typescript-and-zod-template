import bcrypt from 'bcryptjs';

export const hashingHandler = async ({ stringToHash }: { stringToHash: string }) => {
  const salt = await bcrypt.genSalt(14);

  const hashedString = await bcrypt.hash(stringToHash, salt);

  return hashedString;
};
