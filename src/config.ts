import dotenv from 'dotenv';

// Load environment variables from the .env file into process.env
dotenv.config();

interface Config {
  botToken: string;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
}

// Validate that required environment variables are set
if (!process.env.TELEGRAM_API_KEY) {
  throw new Error('Missing BOT_TOKEN in environment variables.');
}

const config: Config = {
  botToken: process.env.TELEGRAM_API_KEY,
  dbHost: process.env.DB_HOST || 'localhost', // Default to 'localhost' if not set
  dbUser: process.env.DB_USER || 'root', // Default to 'root' if not set
  dbPassword: process.env.DB_PASSWORD || '', // Default to an empty string if not set
};

export default config;
