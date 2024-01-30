import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, timeout } from 'rxjs';

import CreateUserDto from './dto/create-user.dto';
import IUser from './interface/iuser';

@Injectable()
export class AppService {

  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
  ) { }

  getUsers(): Observable<IUser[]> {
    const pattern = { cmd: 'get-users' };

    return this.client
      .send<IUser[]>(pattern, {})
      .pipe(timeout(5000));
  }

  createUser(newUser: CreateUserDto): Observable<string> {
    const pattern = { cmd: 'create-user' };

    return this.client
      .send<string>(pattern, newUser)
      .pipe(
        timeout(5000),
        catchError(err => {
          throw new InternalServerErrorException(err.message);
        })
      );

  }
}
