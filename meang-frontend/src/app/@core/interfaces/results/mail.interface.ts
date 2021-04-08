import { Result } from './result.interface';

export interface ResultMail extends Result {}

export interface MutationMail {
  activeUserAction?: ResultMail;
}
