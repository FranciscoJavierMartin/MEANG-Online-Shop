import { User } from '../models/user.interface';
import { Result } from './result.interface';

export interface ResultUsers extends Result {
  users: User[];
}

export interface ResultUser extends Result {
  user: User;
}

export interface QueryUsers {
  users: ResultUsers;
}

export interface MutationUser {
  updateUser?: ResultUser;
}
