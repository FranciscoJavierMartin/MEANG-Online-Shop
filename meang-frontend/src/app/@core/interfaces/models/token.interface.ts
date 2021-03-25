import { User } from './user.interface';

export interface JWToken {
  exp: number;
  iat: number;
  user: User;
}
