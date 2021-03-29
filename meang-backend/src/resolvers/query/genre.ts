import { IResolvers } from 'graphql-tools';
import GenreService from '../../services/genre.service';

const resolversGenresQuery: IResolvers = {
  Query: {
    async genres(_, __, { db }) {
      return await new GenreService(_, __, { db }).items();
    },
    async genre(_, { id }, { db }) {
      return await new GenreService(_, { id }, { db }).item(id);
    },
  },
};

export default resolversGenresQuery;
