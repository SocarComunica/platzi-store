import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongoClient } from 'mongodb';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';

const uri =
  'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary';

const client = new MongoClient(uri);
async function run() {
  await client.connect();
  const database = client.db('platzi-store');
  const tasksCollection = database.collection('tasks');
  const tasks = await tasksCollection.find().toArray();
  console.log(tasks);
}

run();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
