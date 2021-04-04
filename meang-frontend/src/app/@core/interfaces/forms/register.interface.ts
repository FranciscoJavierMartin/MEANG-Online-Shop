import { ROLES } from '@core/enums/roles';

export interface RegisterForm {
  name: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  role?: ROLES;
}

export interface RegisterData {
  name: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  password: string;
  active?: boolean;
}

export interface UpdateData {
  id: string;
  name: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  active: boolean;
  role: ROLES;
}
