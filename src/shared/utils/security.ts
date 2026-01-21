import bcrypt from 'bcryptjs';

const saltRounds = Number(process.env.SALT_ROUNDS) || 12;

export async function encrypt(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
