import { IResolvers } from 'graphql-tools';
import GenreService from '../../services/genre.service';

const resolversGenresQuery: IResolvers = {
  Query: {
    async genres(_, variables, context) {
      return await new GenreService(
        _,
        { pagination: variables },
        context
      ).items();
    },
    async genre(_, { id }, context) {
      return await new GenreService(_, { id }, context).item();
    },
  },
};

export default resolversGenresQuery;
