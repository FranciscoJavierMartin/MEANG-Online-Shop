import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';
import { COLLECTIONS } from '../../config/constants';
import { findOneElement, insertOneElement } from '../../lib/db-operations';

const resolversUsersMutation: IResolvers = {
  Mutation: {
    async register(_, { user }, { db }, info) {
      let res;

      const userCheck = await findOneElement(db, COLLECTIONS.USERS, {
        email: user.email,
      });

      if (userCheck === null) {
        user.registerDate = new Date().toISOString();
        user.password = bcrypt.hashSync(user.password, 10);

        try {
          const userInserted = (
            await insertOneElement(db, COLLECTIONS.USERS, user)
          ).ops[0];
          userInserted.id = userInserted._id;

          res = {
            status: true,
            message: 'User registered successfuly',
            user: userInserted,
          };
        } catch (error) {
          console.log(error);
          res = {
            status: false,
            message: error.toString(),
            user: null,
          };
        }
      } else {
        res = {
          status: false,
          message: `${user.email} is already registered`,
          user: null,
        };
      }
      return res;
    },
  },
};

export default resolversUsersMutation;
