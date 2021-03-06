import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    return `Hello World! ${apiKey}`;
  }

  async getTasks() {
    // const tasksCollection = this.database.collection('tasks');
    // return await tasksCollection.find().toArray();
  }
}
