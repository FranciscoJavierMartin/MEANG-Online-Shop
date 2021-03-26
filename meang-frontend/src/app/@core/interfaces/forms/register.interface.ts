export interface RegisterForm {
  name: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface RegisterData {
  name: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  password: string;
}
