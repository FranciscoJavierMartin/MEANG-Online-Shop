import slugify from 'slugify';
import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import ResolversOperationsService from './resolvers-operations.service';

class TagService extends ResolversOperationsService {
  constructor(root: object, variables: Variables, context: ContextData) {
    super(root, variables, context);
  }

  public async items() {
    const page = this.getVariables().pagination?.page;
    const itemsPage = this.getVariables().pagination?.itemsPage;

    const { status, info, message, items } = await this.list(
      COLLECTIONS.TAGS,
      'Tags',
      page,
      itemsPage
    );
    return {
      info,
      status,
      message,
      tags: items,
    };
  }

  public async item() {
    const { status, message, item } = await this.get(COLLECTIONS.TAGS);
    return {
      status,
      message,
      tag: item,
    };
  }

  public async insert() {
    let res;
    const { tag } = this.getVariables();

    if (tag) {
      if (await this.existsOnDatabase({ name: tag })) {
        res = {
          status: false,
          message: `${tag} tag is already exists on database`,
          tag: null,
        };
      } else {
        const { status, message, item } = await this.add(
          COLLECTIONS.TAGS,
          {
            name: tag,
            slug: slugify(tag, {
              lower: true,
            }),
          },
          'Tag'
        );
        res = {
          status,
          message,
          tag: item,
        };
      }
    } else {
      res = {
        status: false,
        message: 'Tag is not specified',
        tag: null,
      };
    }

    return res;
  }

  public async modify() {
    let res;
    const { id, tag } = this.getVariables();

    if (id && tag) {
      if (await this.existsOnDatabasebyId(id, COLLECTIONS.TAGS)) {
        const objectUpdate = {
          name: tag,
          slug: slugify(tag, { lower: true }),
        };
        const { item, message, status } = await this.update(
          COLLECTIONS.TAGS,
          id,
          objectUpdate,
          'Tag'
        );

        res = {
          status,
          message,
          tag: item,
        };
      } else {
        res = {
          status: false,
          message: 'Tag not found',
          tag: null,
        };
      }
    } else {
      res = {
        status: false,
        message: 'Missing data',
        tag: null,
      };
    }

    return res;
  }

  public async delete() {
    let res;
    const id = this.getVariables().id;

    if (id) {
      if (await this.existsOnDatabasebyId(id, COLLECTIONS.TAGS)) {
        const { status, message } = await this.remove(
          COLLECTIONS.TAGS,
          id,
          'Tag'
        );

        res = {
          status,
          message,
        };
      } else {
        res = {
          status: false,
          message: `Tag with ID ${id} not found`,
        };
      }
    } else {
      res = {
        status: false,
        message: 'Invalid input',
      };
    }

    return res;
  }

  public async block() {
    let res;
    const id = this.getVariables().id;

    if (id) {
      const { status, item } = await this.update(
        COLLECTIONS.TAGS,
        id,
        { active: false },
        'Tag'
      );

      if (status) {
        res = {
          status,
          message: `Tag with ${id} blocked`,
          tag: item,
        };
      } else {
        res = {
          status,
          message: `Error on blocking Tag with ${id}`,
          tag: null,
        };
      }
    } else {
      res = { status: false, message: 'Invalid ID', tag: null };
    }

    return res;
  }
}

export default TagService;
