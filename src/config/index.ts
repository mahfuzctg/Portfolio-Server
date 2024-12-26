import dotenv from "dotenv";
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_SECRET,
  jwt_access_expires: process.env.EXPIRES_IN,
  bcrypt_salt: process.env.SALT,
};
