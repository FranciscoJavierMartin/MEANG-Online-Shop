import { IPaginationOptions } from './pagination-options.interface';
import { IUser } from './user.interface';

export interface Variables {
  id?: string;
  genre?: string;
  tag?: string;
  user?: Partial<IUser>;
  pagination?: IPaginationOptions;
}
