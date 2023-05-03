import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  // serializeUser xac dinh se luu gi vao session
  // cac ham se tu dong duoc goi trong local strategy validate
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }

  // deserializeUser xac dinh se luu gi vao req.user
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
