import dotenv from 'dotenv';
import path from 'path';

// to find the .env file
dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
