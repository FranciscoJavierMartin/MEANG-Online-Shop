import GMR from 'graphql-merge-resolvers';
import resolversGenresMutation from './genre';
import resolversTagsMutation from './tag';
import resolversUsersMutation from './user';

const mutationResolvers = GMR.merge([
  resolversUsersMutation,
  resolversGenresMutation,
  resolversTagsMutation,
]);

export default mutationResolvers;
