import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';
import { COLLECTIONS, MESSAGES } from '../../config/constants';
import JWT from '../../lib/jwt';
import { findElements, findOneElement } from '../../lib/db-operations';

function mapUserDB2User(user: any) {
  return { ...user, id: user._id, _id: undefined };
}

const resolversUsersQuery: IResolvers = {
  Query: {
    async users(_, __, { db }) {
      let res;

      try {
        res = {
          status: true,
          message: 'User list loaded properly',
          users: (await findElements(db, COLLECTIONS.USERS)).map(
            mapUserDB2User
          ),
        };
      } catch (error) {
        console.log(error);
        res = {
          status: false,
          message: error.toString(),
          users: [],
        };
      }

      return res;
    },
    async login(_, { email, password }, { db }) {
      let res;
      try {
        const user = await findOneElement(db, COLLECTIONS.USERS, { email });

        if (user) {
          const passwordCheck = bcrypt.compareSync(password, user.password);

          if (passwordCheck) {
            user.id = user._id;

            delete user.password;
            delete user.birthday;
            delete user.registerDate;
            delete user._id;

            res = {
              status: true,
              message: 'Login successful',
              token: new JWT().sign({ user }),
              user,
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
          user: mapUserDB2User(Object.values(info)[0]),
        };
      }

      return res;
    },
  },
};

export default resolversUsersQuery;
