import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import CreateUserDto from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get('get-users')
  getUsers(): Observable<any[]> {
    return this.appService.getUsers();
  }

  @Post('create-user')
  createUser(@Body() newUser: CreateUserDto): Observable<string> {
    return this.appService.createUser(newUser);
  }
}
