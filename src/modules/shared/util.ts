import * as bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../users/user.constant';
import { UnauthorizedException } from '@nestjs/common';

export class UserUtil {
  public static async hashPassword(plainPassword: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainPassword, SALT_ROUNDS, function (err, passHash) {
        if (err) return reject(err);
        return resolve(passHash);
      });
    });
  }

  public static async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
        if (err) throw new UnauthorizedException();
        return resolve(isMatch);
      });
    });
  }
}
