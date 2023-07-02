import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from './commons/user.entity';

import { NewUserRequest } from './commons/user.request';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get()
  public async getAllUsers() {
    return await this.userRepository.find();
  }

  @Post()
  public async createNewUser(@Body() newUser: NewUserRequest) {
    return await this.userRepository.save(newUser);
  }
}
