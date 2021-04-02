import { Db } from 'mongodb';
import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import {
  deleteOneElement,
  findById,
  findElements,
  findOneElement,
  insertOneElement,
  mapDB2Reponse,
  updateOneElement,
} from '../lib/db-operations';
import { pagination } from '../lib/pagination';

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

  protected getToken(): string | undefined {
    return this.context.token;
  }

  protected async list(
    collection: COLLECTIONS,
    listElement: string,
    page: number = 1,
    itemsPage: number = 20,
    filters: object = { active: { $ne: false } }
  ) {
    let res;

    try {
      const paginationData = await pagination(
        this.getDb(),
        collection,
        page,
        itemsPage,
        filters
      );

      res = {
        status: true,
        info: {
          page: paginationData.page,
          pages: paginationData.pages,
          itemsPage: paginationData.itemsPage,
          total: paginationData.total,
        },
        message: `${listElement} list loaded properly`,
        items: (
          await findElements(
            this.context.db,
            collection,
            filters,
            paginationData
          )
        ).map(mapDB2Reponse),
      };
    } catch (error) {
      console.log(error);
      res = {
        status: false,
        info: null,
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
      const { result, insertedId } = await insertOneElement(
        this.context.db,
        collection,
        document
      );
      if (result.ok === 1) {
        res = {
          status: true,
          message: `Added ${item}`,
          item: { ...document, id: insertedId },
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
      delete (objectUpdate as any).id;

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
          item: { ...objectUpdate, id },
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

  protected async remove(collection: COLLECTIONS, id: string, item: string) {
    let res;

    try {
      const { deletedCount } = await deleteOneElement(
        this.getDb(),
        collection,
        id
      );

      if (deletedCount === 1) {
        res = {
          status: true,
          message: `${item} with ID ${id} removed`,
        };
      } else {
        res = {
          status: false,
          message: `${item} with ID ${id} was not removed`,
        };
      }
    } catch (error) {
      res = {
        status: false,
        message: `Unespected error deleting ${item} with ID ${id}`,
      };
    }

    return res;
  }

  protected async existsOnDatabase(filter: object): Promise<boolean> {
    return !!(await findOneElement(this.getDb(), COLLECTIONS.GENRES, filter));
  }

  protected async existsOnDatabasebyId(
    id: string,
    collection: COLLECTIONS
  ): Promise<boolean> {
    return !!(await findById(this.getDb(), collection, id));
  }
}
