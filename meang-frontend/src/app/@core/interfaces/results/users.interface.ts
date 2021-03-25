import { User } from '../models/user.interface';
import { Result } from './result.interface';

export interface ResultUsers extends Result {
  users: User[];
}

export interface QueryUsers {
  users: ResultUsers;
}
