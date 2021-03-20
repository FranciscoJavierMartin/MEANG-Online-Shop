import { Db } from 'mongodb';
import { COLLECTIONS } from '../config/constants';

export const findOneElement = async (
  database: Db,
  collection: COLLECTIONS,
  filter: object
) => database.collection(collection).findOne(filter);

export const findElements = async (
  database: Db,
  collection: COLLECTIONS,
  filter?: object
) => database.collection(collection).find(filter).toArray();

export const insertOneElement = async (
  database: Db,
  collection: COLLECTIONS,
  document: object
) => database.collection(collection).insertOne(document);

export const insertManyElements = async (
  database: Db,
  collection: COLLECTIONS,
  documents: Array<object>
) => database.collection(collection).insertMany(documents);
