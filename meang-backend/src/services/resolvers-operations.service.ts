import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import {
  findById,
  findElements,
  findOneElement,
  mapDB2Reponse,
} from '../lib/db-operations';

export default class ResolversOperationsService {
  constructor(
    private root: object,
    private variables: Variables,
    private context: ContextData
  ) {}

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
}
