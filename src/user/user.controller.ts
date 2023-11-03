import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/users')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param() param: { userId: string }) {
    return this.userService.getUserById(param.userId);
  }

  @Post('/users')
  async createUser(@Body() body: UserCreateDto, @Res() res: any) {
    // return this.userService.createUser(body);
    return res
      .status(HttpStatus.CREATED)
      .json(this.userService.createUser(body));
  }

  @Patch('/:id')
  async updateUserById() {}

  @Delete('/:id')
  async deletUserByid() {}
}
