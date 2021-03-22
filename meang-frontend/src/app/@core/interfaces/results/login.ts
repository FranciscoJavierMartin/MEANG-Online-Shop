import { Result } from './result';

export interface ResultLogin extends Result {
  token: string;
}

export interface QueryLogin {
  login: ResultLogin;
}
