import { User } from '../models/user.interface';
import { Result } from './result.interface';

export interface ResultMe extends Result {
  user?: User;
}

export interface QueryMe {
  me: ResultMe;
}