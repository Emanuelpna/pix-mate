import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Get, Body, Post, Param, Controller } from '@nestjs/common';

import { User } from 'src/users/commons/user.entity';
import { Post as FeedPost } from './commons/post.entity';

import { PostComment } from './commons/postComments.entity';
import { NewPostCommentRequest } from './commons/postComments.request';

@Controller('posts')
export class PostsCommentsController {
  constructor(
    @InjectRepository(FeedPost)
    private feedPostRepository: Repository<FeedPost>,
    @InjectRepository(PostComment)
    private postCommentRepository: Repository<PostComment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get('comments/:ownerId')
  public async getAllComments(@Param() params: { ownerId: string }) {
    return await this.postCommentRepository.find({
      where: {
        owner: Equal(Number(params.ownerId)),
      },
      relations: {
        owner: true,
        likes: true,
        replyTo: true,
      },
    });
  }

  @Post('/:postId/replyPost/:userId')
  public async replyPost(
    @Param() params: { postId: string; userId: string },
    @Body() newPostComment: NewPostCommentRequest,
  ) {
    const userId = Number(params.userId);

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    const postId = Number(params.postId);

    const post = await this.feedPostRepository.findOne({
      where: {
        id: postId,
      },
    });

    const postComment = this.postCommentRepository.create({
      owner: user,
      replyTo: post,
      description: newPostComment.description,
    });

    return await this.postCommentRepository.save(postComment);
  }

  @Post('/:postId/replyComment/:userId')
  public async replyComment(
    @Param() params: { postId: string; userId: string },
    @Body() newPostComment: NewPostCommentRequest,
  ) {
    const userId = Number(params.userId);

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    console.log(user);

    const postId = Number(params.postId);

    const post = await this.feedPostRepository.findOne({
      where: {
        id: postId,
      },
    });

    const comment = this.postCommentRepository.create({
      owner: user,
      replyTo: post,
      description: newPostComment.description,
    });

    return await this.postCommentRepository.save(comment);
  }
}
