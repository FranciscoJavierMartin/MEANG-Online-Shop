import { IResolvers } from 'graphql-tools';
import GenreService from '../../services/genre.service';

const resolversGenresMutation: IResolvers = {
  Mutation: {
    async addGenre(_, variables, context) {
      return await new GenreService(_, variables, context).insert();
    },
    async updateGenre(_, variables, context) {
      return await new GenreService(_, variables, context).modify();
    },
    async deleteGenre(_, variables, context) {
      return await new GenreService(_, variables, context).delete();
    },
    async blockGenre(_, variables, context){
      return await new GenreService(_, variables, context).block();
    }
  },
};

export default resolversGenresMutation;
