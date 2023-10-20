import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { generateDBUrl } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(generateDBUrl()),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
