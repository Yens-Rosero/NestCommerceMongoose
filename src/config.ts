import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  database: {
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
  },

  mongo: {
    uri: `${process.env.MONGO_CONNECTION}://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    dbName: process.env.MONGO_DB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    },
    credentials: {
      username: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    },
    connection: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10),
      protocol: process.env.MONGO_CONNECTION,
    },
  },

  api: {
    key: process.env.API_KEY,
    prefix: '/api/v1',
    timeout: parseInt(process.env.API_TIMEOUT, 10) || 5000,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: parseInt(process.env.API_RATE_LIMIT, 10) || 100,
    },
  },

  cors: {
    enabled: process.env.CORS_ENABLED === 'true',
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  },
}));
