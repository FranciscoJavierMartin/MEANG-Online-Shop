import { User } from '../models/user';
import { Result } from './result';

export interface ResultMe extends Result {
  user: User | null;
}

export interface QueryMe {
  me: ResultMe;
}