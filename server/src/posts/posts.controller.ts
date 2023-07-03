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

import { NewPostRequest } from './commons/post.request';

@Controller('posts')
export class PostsController {
  constructor(
    @InjectRepository(FeedPost)
    private feedPostRepository: Repository<FeedPost>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get(':ownerId')
  public async getPostsByOwnerId(@Param() params: { ownerId: string }) {
    return await this.feedPostRepository.find({
      where: {
        owner: Equal(Number(params.ownerId)),
      },
      relations: {
        owner: true,
        likes: true,
        replys: true,
      },
    });
  }

  @Post(':ownerId')
  public async createNewPost(
    @Param() params: { ownerId: string },
    @Body() newPost: NewPostRequest,
  ) {
    const user = await this.userRepository.findOneBy({
      id: Number(params.ownerId),
    });

    assert(
      user !== null,
      new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: ['Não foi encontrado nenhum user para o id fornecido'],
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
    );

    return await this.feedPostRepository.save({
      owner: user,
      endpoint: newPost.endpoint,
      description: newPost.description,
    });
  }
}
