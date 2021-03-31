import { IResolvers } from 'graphql-tools';
import GenreService from '../../services/genre.service';

const resolversGenresQuery: IResolvers = {
  Query: {
    async genres(_, variables, { db }) {
      return await new GenreService(
        _,
        { pagination: variables },
        { db }
      ).items();
    },
    async genre(_, { id }, { db }) {
      return await new GenreService(_, { id }, { db }).item();
    },
  },
};

export default resolversGenresQuery;
