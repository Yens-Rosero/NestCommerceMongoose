import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, credentials, dbName } = configService.mongo;
        const uri = `${connection.protocol}://${credentials.username}:${credentials.password}@${connection.host}:${connection.port}`;

        try {
          const client = new MongoClient(uri);
          await client.connect();
          console.log('MongoDB connection successful');
          return {
            uri,
            dbName,
          };
        } catch (error) {
          console.error('Error connecting to MongoDB:', error);
          throw error;
        }
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return configService.api.key;
      },
    },
    {
      provide: 'MONGO_CLIENT',
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, credentials, dbName } = configService.mongo;
        const uri = `${connection.protocol}://${credentials.username}:${credentials.password}@${connection.host}:${connection.port}`;

        try {
          const client = new MongoClient(uri);
          await client.connect();
          return client.db(dbName);
        } catch (error) {
          console.error('Error connecting to MongoDB:', error);
          throw error;
        }
      },
    },
  ],
  exports: ['API_KEY', 'MONGO_CLIENT', MongooseModule],
})
export class DatabaseModule {}
