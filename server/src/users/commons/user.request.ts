import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';

import { User } from './user.entity';

import { IsUnique } from 'src/validators/isUnique.validator';

export class NewUserRequest {
  @IsNotEmpty()
  @Length(1, 520)
  name: string;

  @IsNotEmpty()
  @Length(1, 30)
  username: string;

  @IsNotEmpty()
  @Length(1, 520)
  @IsEmail()
  @Validate(IsUnique, [{ Entity: User, ColumnName: 'email' }])
  email: string;

  @Length(0, 520)
  website: string;

  @Length(0, 120)
  bio: string;
}
