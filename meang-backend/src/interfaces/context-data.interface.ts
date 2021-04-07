import { Db } from 'mongodb';

export interface ContextData {
  db?: Db;
  token?: string;
}