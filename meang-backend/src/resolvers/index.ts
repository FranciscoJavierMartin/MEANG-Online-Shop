import { IResolvers } from 'graphql-tools';
import query from './query';
import mutations from './mutations';

const resolvers: IResolvers = {
  ...query,
  ...mutations,
};

export default resolvers;