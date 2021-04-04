import { IResolvers } from 'graphql-tools';
import GenreService from '../../services/genre.service';

const resolversGenresQuery: IResolvers = {
  Query: {
    genres(_, variables, context) {
      return new GenreService(_, { pagination: variables }, context).items();
    },
    genre(_, { id }, context) {
      return new GenreService(_, { id }, context).item();
    },
  },
};

export default resolversGenresQuery;
