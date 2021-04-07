import bcrypt from 'bcrypt';
import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { findOneElement } from '../lib/db-operations';
import JWT from '../lib/jwt';
import MailService from './mail.service';
import ResolversOperationsService from './resolvers-operations.service';

class PasswordService extends ResolversOperationsService {
  constructor(root: object, variables: object, context: ContextData) {
    super(root, variables, context);
  }

  public async sendEmail() {
    let res;
    const email = this.getVariables().user?.email;
    if (email) {
      const user = await findOneElement(this.getDb(), COLLECTIONS.USERS, {
        email,
      });

      if (user) {
        const token = new JWT().sign({ user }, EXPIRETIME.H1);
        const html = `Click <a href="${process.env.CLIENT_URL}/#/active/${token}">here</a> to reset your password.`;

        res = new MailService().send({
          html,
          to: email,
          subject: 'Change password',
        });
      } else {
        res = {
          status: false,
          message: `User with email ${email} does not exist.`,
        };
      }
    } else {
      res = {
        status: false,
        message: 'Email was not provided',
      };
    }

    return res;
  }

  public async change() {
    let res;
    const id = this.getVariables().user?.id;
    const password = this.getVariables().user?.password;

    if (id && password) {
      const { status } = await this.update(
        COLLECTIONS.USERS,
        id,
        { password: bcrypt.hashSync(password, 10) },
        'User'
      );

      res = {
        status: true,
        message: status ? 'Password changed' : 'Password has not been changed',
      };
    } else {
      res = {
        status: false,
        message: 'Invalid params',
      };
    }

    return res;
  }
}

export default PasswordService;
