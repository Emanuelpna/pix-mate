import { strict as assert } from 'assert';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Get,
  Body,
  Post,
  Param,
  Controller,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { User } from 'src/users/commons/user.entity';
import { Post as FeedPost } from './commons/post.entity';

import { PostComment } from './commons/postComments.entity';

@Controller('posts')
export class PostsInteractionsController {
  constructor(
    @InjectRepository(FeedPost)
    private feedPostRepository: Repository<FeedPost>,
    @InjectRepository(PostComment)
    private postCommentRepository: Repository<PostComment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Post(':postId/likePost/:userId')
  public async likePost(@Param() params: { postId: string; userId: string }) {
    const post = await this.feedPostRepository.findOne({
      where: {
        id: Number(params.postId),
      },
    });

    const userId = Number(params.userId);

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!post.likes) post.likes = [];

    if (post.likes.findIndex((like) => like.id === userId) >= 0) {
      post.likes.filter((like) => like.id === userId);
    } else {
      post.likes.push(user);
    }

    return await this.feedPostRepository.save(post);
  }

  @Post(':postId/likeComment/:userId')
  public async likeComment(
    @Param() params: { postId: string; userId: string },
  ) {
    const post = await this.postCommentRepository.findOne({
      where: {
        id: Number(params.postId),
      },
    });

    const userId = Number(params.userId);

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!post.likes) post.likes = [];

    if (post.likes.findIndex((like) => like.id === userId) >= 0) {
      post.likes.filter((like) => like.id === userId);
    } else {
      post.likes.push(user);
    }

    return await this.postCommentRepository.save(post);
  }
}
