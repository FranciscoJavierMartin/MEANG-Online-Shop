import { Db, ObjectId } from 'mongodb';
import { COLLECTIONS } from '../config/constants';
import { IPaginationOptions } from '../interfaces/pagination-options.interface';

export const findOneElement = async (
  database: Db,
  collection: COLLECTIONS,
  filter: object
) => database.collection(collection).findOne(filter);

export const findById = async (
  database: Db,
  collection: COLLECTIONS,
  id: string | number | undefined
) => database.collection(collection).findOne({ _id: new ObjectId(id) });

export const findElements = async (
  database: Db,
  collection: COLLECTIONS,
  filter: object = {},
  paginationOptions: IPaginationOptions = {
    page: 1,
    pages: 1,
    itemsPage: 20,
    total: -1,
    skip: 0,
  }
) => {
  let res;
  console.log(paginationOptions);
  if (paginationOptions.total === -1) {
    res = await database.collection(collection).find(filter).toArray();
  } else {
    res = await database
      .collection(collection)
      .find(filter)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.itemsPage)
      .toArray();
  }

  return res;
};

export const countElements = async (
  database: Db,
  collection: COLLECTIONS
): Promise<number> => await database.collection(collection).countDocuments();

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

export const updateOneElement = async (
  database: Db,
  collection: COLLECTIONS,
  id: string,
  objectUpdate: object
) =>
  database
    .collection(collection)
    .updateOne({ _id: new ObjectId(id) }, { $set: objectUpdate });

export const deleteOneElement = async (
  database: Db,
  collection: COLLECTIONS,
  id: string
) => database.collection(collection).deleteOne({ _id: new ObjectId(id) });

export const mapDB2Reponse = (entity: any) => ({
  ...entity,
  id: entity._id,
  _id: undefined,
});
