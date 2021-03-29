import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
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

  async item(id: string | number) {
    const { status, message, item } = await this.get(COLLECTIONS.GENRES);
    return {
      status,
      message,
      genre: item,
    };
  }
}

export default GenreService;
