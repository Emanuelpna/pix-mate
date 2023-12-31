import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';

const ASSETS_FOLDER = process.env.PUBLIC_ASSETS_FOLDER ?? '/public/assets';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV === 'development',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ASSETS_FOLDER),
      serveRoot: ASSETS_FOLDER,
    }),
    UsersModule,
    PostsModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
