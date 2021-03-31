import { IPaginationOptions } from './pagination-options.interface';
import { IUser } from './user.interface';

export interface Variables {
  id?: string | number;
  genre?: string;
  user?: Partial<IUser>;
  pagination?: IPaginationOptions;
}
