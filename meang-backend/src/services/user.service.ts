import bcrypt from 'bcrypt';
import JWT from '../lib/jwt';
import { COLLECTIONS, MESSAGES } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import { findOneElement, mapDB2Reponse } from '../lib/db-operations';
import ResolversOperationsService from './resolvers-operations.service';

class UserService extends ResolversOperationsService {
  constructor(root: object, variables: Variables, context: ContextData) {
    super(root, variables, context);
  }

  async users() {
    const page = this.getVariables().pagination?.page;
    const itemsPage = this.getVariables().pagination?.itemsPage;

    const { status, message, items, info } = await this.list(
      COLLECTIONS.USERS,
      'Users',
      page,
      itemsPage
    );
    return {
      status,
      info,
      message,
      users: items,
    };
  }

  public async login() {
    let res;
    try {
      const variables = this.getVariables().user;

      if (variables) {
        const { email, password } = variables;

        const user = await findOneElement(this.getDb(), COLLECTIONS.USERS, {
          email,
        });

        if (user && password) {
          const passwordCheck = bcrypt.compareSync(password, user.password);

          if (passwordCheck) {
            delete user.password;
            delete user.registerDate;

            res = {
              status: true,
              message: 'Login successful',
              token: new JWT().sign({ user: mapDB2Reponse(user) }),
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
      }
    } catch (error) {
      res = {
        status: false,
        message: 'Error on login user',
        token: null,
      };
    }

    return res;
  }

  public me() {
    let res;
    const token = this.getToken();
    if (token) {
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
    } else {
      res = {
        status: false,
        message: 'Token has not been sent',
        user: null,
      };
    }

    return res;
  }

  public async register() {
    let res;
    const user = this.getVariables().user;
    const db = this.getDb();
    if (user) {
      const userCheck = await findOneElement(db, COLLECTIONS.USERS, {
        email: user.email,
      });

      if (userCheck === null) {
        user.registerDate = new Date().toISOString();
        user.password = bcrypt.hashSync(user.password, 10);

        try {
          const { status, message, item } = await this.add(
            COLLECTIONS.USERS,
            user,
            'Users'
          );
          res = {
            status,
            message,
            user: mapDB2Reponse(item),
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
    } else {
      res = {
        status: false,
        message: 'Invalid params',
        user: null,
      };
    }
    return res;
  }

  public async modify() {
    let res;
    const user = this.getVariables().user;

    if (user) {
      const { status, message, item } = await this.update(
        COLLECTIONS.USERS,
        user.id!,
        user,
        'User'
      );
      res = {
        status,
        message,
        user: item,
      };
    } else {
      res = {
        status: false,
        message: 'Missing param',
        user: null,
      };
    }

    return res;
  }

  public async delete() {
    let res;
    const { id } = this.getVariables();
    if (id) {
      res = await this.remove(COLLECTIONS.USERS, id, 'User');
    } else {
      res = {
        status: false,
        message: 'Invalid input',
        user: null,
      };
    }

    return res;
  }

  public async unblock(unblock: boolean) {
    let res;
    const id = this.getVariables().id;
    const user = this.getVariables().user;

    if (user && user.password !== '1234') {
      res = {
        status: false,
        message: 'Please change default password',
      };
    } else if (id && user) {
      let updatedAttributes;
      if (unblock) {
        updatedAttributes = { active: unblock };
      } else {
        updatedAttributes = Object.assign(
          { active: unblock },
          {
            dateOfBirth: user.dateOfBirth,
            password: bcrypt.hashSync(user.password, 10),
          }
        );
      }

      const { status, item } = await this.update(
        COLLECTIONS.USERS,
        id,
        updatedAttributes,
        'User'
      );

      if (status) {
        res = {
          status,
          message: unblock
            ? `User with ${id} unblocked`
            : `User with ${id} blocked`,
          user: item,
        };
      } else {
        res = {
          status,
          message: unblock
            ? `Error on unblocking User with ${id}`
            : `Error on blocking User with ${id}`,
          user: null,
        };
      }
    } else {
      res = { status: false, message: 'Invalid ID', user: null };
    }

    return res;
  }
}

export default UserService;
