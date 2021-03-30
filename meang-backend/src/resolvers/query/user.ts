import { IResolvers } from 'graphql-tools';
import { MESSAGES } from '../../config/constants';
import JWT from '../../lib/jwt';
import UserService from '../../services/user.service';

const resolversUsersQuery: IResolvers = {
  Query: {
    async users(_, __, context) {
      return await new UserService(_, __, context).users();
    },
    async login(_, { email, password }, context) {
      return await new UserService(
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
