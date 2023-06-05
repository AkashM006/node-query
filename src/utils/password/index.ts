import bcrypt from "bcrypt";

const generateHash = async (password: string): Promise<String> => {
  const saltRounds = process.env.SALT_ROUNDS ?? 10;

  const result = await bcrypt.hash(password, +saltRounds);

  return result;
};

export { generateHash };
