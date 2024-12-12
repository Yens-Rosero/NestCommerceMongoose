import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mongo:{
      dbName: process.env.MONGO_DB_NAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      port: parseInt(process.env.MONGO_PORT,10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    apiKey: process.env.API_KEY,
  };
});
