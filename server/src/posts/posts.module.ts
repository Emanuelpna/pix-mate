import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './commons/post.entity';
import { User } from 'src/users/commons/user.entity';
import { PostComment } from './commons/postComments.entity';

import { PostsService } from './posts.service';

import { PostsController } from './posts.controller';
import { PostsCommentsController } from './postsComments.controller';
import { PostsInteractionsController } from './postsInteractions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, PostComment, Post])],
  controllers: [
    PostsController,
    PostsInteractionsController,
    PostsCommentsController,
  ],
  providers: [PostsService],
})
export class PostsModule {}
