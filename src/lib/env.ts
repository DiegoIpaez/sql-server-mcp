import 'dotenv/config';

export function requireEnv(value: string) {
  const env = process.env[value];
  if (!env) throw new Error(`Falta por definir ${value}`);
  return env;
}

export const env = {
  DB_USER: requireEnv('DB_USER'),
  DB_PASSWORD: requireEnv('DB_PASSWORD'),
  DB_HOST: requireEnv('DB_HOST'),
  DB_NAME: requireEnv('DB_NAME'),
  DB_PORT: Number(requireEnv('DB_PORT')),
};
