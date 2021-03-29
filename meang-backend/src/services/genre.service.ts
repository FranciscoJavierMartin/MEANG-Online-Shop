import slugify from 'slugify';
import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import { findOneElement } from '../lib/db-operations';
import ResolversOperationsService from './resolvers-operations.service';

class GenreService extends ResolversOperationsService {
  constructor(root: object, variables: Variables, context: ContextData) {
    super(root, variables, context);
  }

  async items() {
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

  async item() {
    const { status, message, item } = await this.get(COLLECTIONS.GENRES);
    return {
      status,
      message,
      genre: item,
    };
  }

  async insert() {
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

  private async existsOnDatabase(value: string): Promise<boolean> {
    return !!(await findOneElement(this.getDb(), COLLECTIONS.GENRES, {
      name: value,
    }));
  }
}

export default GenreService;
