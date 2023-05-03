import { Injectable } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { UserGetResponse } from '@shared/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username, password): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user?.password);
      if (isPasswordMatching) {
        return user as UserGetResponse;
      }
    }
    return null;
  }
}
