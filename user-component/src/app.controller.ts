import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import IUser from './interface/iuser';
import CreateUserDto from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'get-users' })
  getUsers(): IUser[] {
    return this.appService.getUsers();
  }

  @MessagePattern({ cmd: 'create-user' })
  addUser(createUser: CreateUserDto): string {
    try {
      return this.appService.createUser(createUser);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
