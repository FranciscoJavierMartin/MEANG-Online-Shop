import { User } from '../models/user';
import { Result } from './result';

export interface ResultUsers extends Result {
  users: User[];
}

export interface QueryUsers {
  users: ResultUsers;
}
