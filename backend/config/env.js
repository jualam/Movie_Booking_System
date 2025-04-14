import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` }); //path pointing towards multiple env files

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env;
