import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOne(userName: string): Promise<User | undefined> {
    const cahedUser = await this.cacheManager.get(userName);
    if (cahedUser) {
      return cahedUser as User;
    }
    const user = await this.userModel.findOne({ userName });
    await this.cacheManager.set(userName, user);
    return user;
  }

  async markUserLoggedIn(userName: string) {
    await this.userModel.updateOne({ userName }, { loggedIn: true });
    await this.cacheManager.del(userName);
    return true;
  }

  async logout(userName: string) {
    await this.userModel.updateOne({ userName }, { loggedIn: false });
    await this.cacheManager.del(userName);
    return true;
  }

  async addNewUser(userName: string, password: string): Promise<User> {
    const newUser = new this.userModel({ userName, password });
    return newUser.save();
  }

  async isUserNameAvailable(userName: string) {
    const count = await this.userModel.countDocuments({ userName });
    return count == 0;
  }
}
