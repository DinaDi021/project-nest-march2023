import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users = [];
  constructor() {}

  async createUser(userData: UserCreateDto) {
    this.users.push(userData);
    return this.users;
  }

  async getUserById(userId: string) {
    return this.users.find((item) => item.id === userId)[0];
  }

  async getAllUsers() {
    return this.users;
  }
}
