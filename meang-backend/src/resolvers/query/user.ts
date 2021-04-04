import { IResolvers } from 'graphql-tools';
import UserService from '../../services/user.service';

const resolversUsersQuery: IResolvers = {
  Query: {
    users(_, variables, context) {
      return new UserService(_, { pagination: variables }, context).users();
    },
    login(_, { email, password }, context) {
      return new UserService(
        _,
        { user: { email, password } },
        context
      ).login();
    },
    me(_, __, context) {
      return new UserService(_, __, context).me();
    },
  },
};

export default resolversUsersQuery;
