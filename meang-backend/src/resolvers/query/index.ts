import GMR from 'graphql-merge-resolvers';
import resolversGenresQuery from './genre';
import resolversProductsQuery from './product';
import resolversTagsQuery from './tag';
import resolversUsersQuery from './user';

const queryResolvers = GMR.merge([
  resolversUsersQuery,
  resolversProductsQuery,
  resolversGenresQuery,
  resolversTagsQuery,
]);

export default queryResolvers;
