import { IResolvers } from 'graphql-tools';
import GenreService from '../../services/genre.service';

const resolversGenresMutation: IResolvers = {
  Mutation: {
    async addGenre(_, variables, context) {
      return await new GenreService(_, variables, context).insert();
    },
  },
};

export default resolversGenresMutation;
