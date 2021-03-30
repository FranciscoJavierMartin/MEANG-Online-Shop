import { IResolvers } from 'graphql-tools';
import UserService from '../../services/user.service';

const resolversUsersMutation: IResolvers = {
  Mutation: {
    async register(_, variables, context) {
      return await new UserService(_, variables, context).register();
    },
    async updateUser(_, variables, context){
      return await new UserService(_, variables, context).modify();
    },
    async deleteUser(_, variales, context){
      return await new UserService(_, variales, context).delete();
    }
  },
};

export default resolversUsersMutation;
