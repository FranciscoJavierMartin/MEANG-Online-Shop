import { User } from '../models/user.interface';
import { Result } from './result.interface';

export interface ResultRegister extends Result {
  user?: User
}

export interface MutationRegister {
  register: ResultRegister;
}
