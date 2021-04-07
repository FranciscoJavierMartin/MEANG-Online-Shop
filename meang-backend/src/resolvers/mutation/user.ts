import { IResolvers } from 'graphql-tools';
import UserService from '../../services/user.service';

const resolversUsersMutation: IResolvers = {
  Mutation: {
    register(_, variables, context) {
      return new UserService(_, variables, context).register();
    },
    updateUser(_, variables, context){
      return new UserService(_, variables, context).modify();
    },
    deleteUser(_, variales, context){
      return new UserService(_, variales, context).delete();
    },
    blockUser(_, variables, context){
      return new UserService(_, variables, context).unblock(false);
    },
  },
};

export default resolversUsersMutation;
