import { EXPIRETIME, MESSAGES, SECRET_KEY } from '../config/constants';
import jwt from 'jsonwebtoken';
import { IJwt } from '../interfaces/jwt.interface';

class JWT {
  private secretKey: string = SECRET_KEY;

  sign(data: IJwt, expiresIn: number = EXPIRETIME.D7): string {
    return jwt.sign(
      {
        user: data.user,
      },
      this.secretKey,
      {
        expiresIn,
      }
    );
  }

  verify(token: string) {
    let res;

    try {
      res = jwt.verify(token, this.secretKey);
    } catch (error) {
      res = MESSAGES.TOKEN_VERIFICATION_FAILED;
    }

    return res;
  }
}

export default JWT;
