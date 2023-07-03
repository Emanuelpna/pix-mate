import { IsNotEmpty, IsString, Length } from 'class-validator';

export class NewPostCommentRequest {
  @IsNotEmpty()
  @Length(1, 520)
  @IsString()
  description: string;
}
