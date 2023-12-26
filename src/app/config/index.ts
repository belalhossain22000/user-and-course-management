import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  password_salt_rounds:process.env.PASSWORD_SALT_ROUND,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET
};
