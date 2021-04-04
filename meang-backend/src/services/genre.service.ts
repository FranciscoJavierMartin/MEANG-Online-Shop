import slugify from 'slugify';
import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import ResolversOperationsService from './resolvers-operations.service';

class GenreService extends ResolversOperationsService {
  constructor(root: object, variables: Variables, context: ContextData) {
    super(root, variables, context);
  }

  public async items() {
    const page = this.getVariables().pagination?.page;
    const itemsPage = this.getVariables().pagination?.itemsPage;

    const { status, info, message, items } = await this.list(
      COLLECTIONS.GENRES,
      'Genres',
      page,
      itemsPage
    );
    return {
      info,
      status,
      message,
      genres: items,
    };
  }

  public async item() {
    const { status, message, item } = await this.get(COLLECTIONS.GENRES);
    return {
      status,
      message,
      genre: item,
    };
  }

  public async insert() {
    let res;
    const { genre } = this.getVariables();

    if (genre) {
      if (await this.existsOnDatabase({ name: genre })) {
        res = {
          status: false,
          message: `${genre} genre is already exists on database`,
          genre: null,
        };
      } else {
        const { status, message, item } = await this.add(
          COLLECTIONS.GENRES,
          {
            name: genre,
            slug: slugify(genre, {
              lower: true,
            }),
          },
          'Genre'
        );
        res = {
          status,
          message,
          genre: item,
        };
      }
    } else {
      res = {
        status: false,
        message: 'Genre is not specified',
        genre: null,
      };
    }

    return res;
  }

  public async modify() {
    let res;
    const { id, genre } = this.getVariables();

    if (id && genre) {
      if (await this.existsOnDatabasebyId(id, COLLECTIONS.GENRES)) {
        const objectUpdate = {
          name: genre,
          slug: slugify(genre, { lower: true }),
        };
        const { item, message, status } = await this.update(
          COLLECTIONS.GENRES,
          id,
          objectUpdate,
          'Genre'
        );

        res = {
          status,
          message,
          genre: item,
        };
      } else {
        res = {
          status: false,
          message: 'Genre not found',
          genre: null,
        };
      }
    } else {
      res = {
        status: false,
        message: 'Missing data',
        genre: null,
      };
    }

    return res;
  }

  public async delete() {
    let res;
    const id = this.getVariables().id;

    if (id) {
      if (await this.existsOnDatabasebyId(id, COLLECTIONS.GENRES)) {
        const { status, message } = await this.remove(
          COLLECTIONS.GENRES,
          id,
          'Genre'
        );

        res = {
          status,
          message,
        };
      } else {
        res = {
          status: false,
          message: `Genre with ID ${id} not found`,
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
        COLLECTIONS.GENRES,
        id,
        { active: false },
        'Genre'
      );

      if (status) {
        res = {
          status,
          message: `Genre with ${id} blocked`,
          genre: item,
        };
      } else {
        res = {
          status,
          message: `Error on blocking Genre with ${id}`,
          genre: null,
        };
      }
    } else {
      res = { status: false, message: 'Invalid ID', genre: null };
    }

    return res;
  }
}

export default GenreService;
