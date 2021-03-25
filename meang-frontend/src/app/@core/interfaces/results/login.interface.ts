import { User } from '../models/user.interface';
import { Result } from './result.interface';

export interface ResultLogin extends Result {
  token?: string;
  user?: User
}

export interface QueryLogin {
  login: ResultLogin;
}
