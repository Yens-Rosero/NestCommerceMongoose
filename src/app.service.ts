import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject('MONGO_CLIENT') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getTasks() {
    return this.tasks;
  }

  getDatabase() {
    return this.database;
  }
}
