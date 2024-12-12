import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';

import config from 'src/config';
const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/test', {
    //   user: process.env.MONGO_INITDB_ROOT_USERNAME,
    //   pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    //   dbName: process.env.MONGO_DB_NAME,
    // }),
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, dbName, password, port, host, connection } =
          configService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}:${port}`,
          dbName,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, dbName, password, port, host, connection } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
