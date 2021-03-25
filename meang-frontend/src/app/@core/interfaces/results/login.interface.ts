import { Result } from './result.interface';

export interface ResultLogin extends Result {
  token?: string;
}

export interface QueryLogin {
  login: ResultLogin;
}
