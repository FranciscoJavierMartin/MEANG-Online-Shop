import { Db } from 'mongodb';
import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import {
  findById,
  findElements,
  insertOneElement,
  mapDB2Reponse,
  updateOneElement,
} from '../lib/db-operations';

export default class ResolversOperationsService {
  constructor(
    private root: object,
    private variables: Variables,
    private context: ContextData
  ) {}

  protected getVariables(): Variables {
    return this.variables;
  }

  protected getDb(): Db {
    return this.context.db;
  }

  protected async list(collection: COLLECTIONS, listElement: string) {
    let res;

    try {
      res = {
        status: true,
        message: `${listElement} list loaded properly`,
        items: (await findElements(this.context.db, collection)).map(
          mapDB2Reponse
        ),
      };
    } catch (error) {
      console.log(error);
      res = {
        status: false,
        message: error.toString(),
        items: [],
      };
    }

    return res;
  }

  protected async get(collection: COLLECTIONS) {
    let res;

    try {
      const result = await findById(
        this.context.db,
        collection,
        this.variables.id
      );
      if (result) {
        res = {
          status: true,
          message: `Genre with ID ${this.variables.id} found`,
          item: mapDB2Reponse(result),
        };
      } else {
        res = {
          status: true,
          message: `Genre with ID ${this.variables.id} not found`,
          item: null,
        };
      }
    } catch (error) {
      res = {
        status: false,
        message: error.toString(),
        item: null,
      };
    }

    return res;
  }

  protected async add(collection: COLLECTIONS, document: object, item: string) {
    let res;
    try {
      const { result } = await insertOneElement(
        this.context.db,
        collection,
        document
      );
      if (result.ok === 1) {
        res = {
          status: true,
          message: `Added ${item}`,
          item: document,
        };
      } else {
        res = {
          status: false,
          message: `${item} has not been inserted.`,
          item: null,
        };
      }
    } catch (error) {
      res = {
        status: false,
        message: `Error adding ${item}`,
        item: null,
      };
    }

    return res;
  }

  protected async update(
    collection: COLLECTIONS,
    id: string,
    objectUpdate: object,
    item: string
  ) {
    let res;
    try {
      const { result } = await updateOneElement(
        this.getDb(),
        collection,
        id,
        objectUpdate
      );

      if (result.ok) {
        res = {
          status: true,
          message: `${item} updated`,
          item: Object.assign({ id }, objectUpdate),
        };
      } else {
        res = {
          status: false,
          message: `${item} does not updated`,
          item: null,
        };
      }
    } catch (error) {
      res = {
        status: false,
        message: `Error on update ${item}`,
        item: null,
      };
    }

    return res;
  }
}
