import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';
import { COLLECTIONS, MESSAGES } from '../../config/constants';
import JWT from '../../lib/jwt';
import { findOneElement, mapDB2Reponse } from '../../lib/db-operations';
import UserService from '../../services/user.service';

const resolversUsersQuery: IResolvers = {
  Query: {
    async users(_, __, { db }) {
      return await new UserService(_, __, { db }).items();
    },
    async login(_, { email, password }, { db }) {
      let res;
      try {
        const user = await findOneElement(db, COLLECTIONS.USERS, { email });

        if (user) {
          const passwordCheck = bcrypt.compareSync(password, user.password);

          if (passwordCheck) {
            delete user.password;
            delete user.registerDate;

            res = {
              status: true,
              message: 'Login successful',
              token: new JWT().sign({ user }),
              user: mapDB2Reponse(user),
            };
          } else {
            res = {
              status: false,
              message: 'Email or Password invalid',
              token: null,
            };
          }
        } else {
          res = {
            status: false,
            message: 'Email or Password invalid',
            token: null,
          };
        }
      } catch (error) {
        res = {
          status: false,
          message: 'Error on login user',
          token: null,
        };
      }

      return res;
    },
    me(_, __, { token }) {
      let res;
      let info = new JWT().verify(token);

      if (info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
        res = {
          status: false,
          message: info,
          user: null,
        };
      } else {
        res = {
          status: true,
          message: 'User authenticated',
          user: Object.values(info)[0],
        };
      }

      return res;
    },
  },
};

export default resolversUsersQuery;
