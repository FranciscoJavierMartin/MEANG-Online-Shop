import environment from './environments';

if (process.env.NODE_ENV !== 'production') {
  const env = environment;
}

export const SECRET_KEY = process.env.SECRET || '';

export enum COLLECTIONS {
  USERS = 'users',
}

export enum MESSAGES {
  TOKEN_VERIFICATION_FAILED = 'Invalid token. Please login again',
}

export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  D7 = H24 * 7,
}