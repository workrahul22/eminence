import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '../hashing/hashing.service';
import { User } from '../users/users.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private hashingService: HashingService,
  ) {}

  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(userName);
    const matched = await this.hashingService.comparePasswords(
      pass,
      user.password,
    );
    if (!matched) {
      throw new UnauthorizedException(`Username or password is invalid`);
    }
    await this.userService.markUserLoggedIn(userName);
    const payload = { sub: user.userId, userName: user.userName };
    return {
      accessToke: await this.jwtService.signAsync(payload),
    };
  }

  async signup(userName: string, pass: string): Promise<User> {
    const userNameAvailable =
      await this.userService.isUserNameAvailable(userName);
    if (!userNameAvailable) {
      throw new UnprocessableEntityException('UserName already taken');
    }
    const hashedPassword = await this.hashingService.createHash(pass);
    const user = await this.userService.addNewUser(userName, hashedPassword);
    return user as User;
  }

  async getUserDetails(userName: string): Promise<User> {
    const user = await this.userService.findOne(userName);
    return user;
  }

  async logout(userName: string) {
    await this.userService.logout(userName);
  }
}
