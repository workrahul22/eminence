import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  constructor() {}

  async createHash(rawString: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawString, SALT);
  }

  async comparePasswords(rawPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(rawPassword, hashedPassword);
  }
}
