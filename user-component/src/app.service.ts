import { Injectable } from '@nestjs/common';
import IUser from './interface/iuser';

@Injectable()
export class AppService {
  users: IUser[] = [];

  getUsers(): IUser[] {
    return this.users;
  }

  createUser(newUser: IUser): string {

    if (this.users.find(user => user.email === newUser.email)) {
      throw new Error('User already exists');
    }

    // we create new id (as hash) for the new user
    const user = { ...newUser, _id: Math.random().toString(36).substring(2, 9) };
    this.users.push(user);

    return user._id;
  }
}
