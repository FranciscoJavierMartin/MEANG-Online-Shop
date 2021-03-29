import GMR from 'graphql-merge-resolvers';
import resolversGenresMutation from './genre';
import resolversUsersMutation from './user';

const mutationResolvers = GMR.merge([
  resolversUsersMutation,
  resolversGenresMutation,
]);

export default mutationResolvers;
