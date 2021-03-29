import slugify from 'slugify';
import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import { findById, findOneElement } from '../lib/db-operations';
import ResolversOperationsService from './resolvers-operations.service';

class GenreService extends ResolversOperationsService {
  constructor(root: object, variables: Variables, context: ContextData) {
    super(root, variables, context);
  }

  public async items() {
    const { status, message, items } = await this.list(
      COLLECTIONS.GENRES,
      'Genres'
    );
    return {
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
      if (await this.existsOnDatabase(genre)) {
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
      if (await this.existsOnDatabasebyId(String(id))) {
        const objectUpdate = {
          name: genre,
          slug: slugify(genre, { lower: true }),
        };
        const { item, message, status } = await this.update(
          COLLECTIONS.GENRES,
          String(id),
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

  private async existsOnDatabase(value: string): Promise<boolean> {
    return !!(await findOneElement(this.getDb(), COLLECTIONS.GENRES, {
      name: value,
    }));
  }

  private async existsOnDatabasebyId(id: string): Promise<boolean> {
    return !!(await findById(this.getDb(), COLLECTIONS.GENRES, id));
  }
}

export default GenreService;
