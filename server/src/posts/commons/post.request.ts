import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';

import { Post } from './post.entity';

import { IsUnique } from 'src/validators/isUnique.validator';

export class NewPostRequest {
  @IsNotEmpty()
  @Length(1, 520)
  @IsEmail()
  @Validate(IsUnique, [{ Entity: Post, ColumnName: 'endpoint' }])
  endpoint: string;

  @Length(0, 520)
  description: string;
}
