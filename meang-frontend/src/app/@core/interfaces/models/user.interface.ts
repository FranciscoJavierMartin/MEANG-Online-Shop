import { ROLES } from '@core/enums/roles';

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  registerDate?: string;
  dateOfBirth?: string;
  role?: ROLES;
  active: boolean;
}
