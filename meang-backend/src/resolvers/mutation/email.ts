import { IResolvers } from 'graphql-tools';
import { MESSAGES } from '../../config/constants';
import JWT from '../../lib/jwt';
import UserService from '../../services/user.service';
import MailService from '../../services/mail.service';
import PasswordService from '../../services/password.service';

const resolversEmailMutation: IResolvers = {
  Mutation: {
    async sendEmail(_, { mail }) {
      return new MailService().send(mail);
    },
    async activeUserEmail(_, { id, email }, context) {
      return new UserService(_, { user: { id, email } }, context).active();
    },
    async activeUserAction(_, { id, dateOfBirth, password }, { db, token }) {
      let res = verifyToken(token, id);

      if (res.status) {
        res = await new UserService(
          _,
          { id, user: { dateOfBirth, password } },
          { token, db }
        ).unblock(true);
      }

      return res;
    },
    async resetPassword(_, { email }, context) {
      return new PasswordService(_, { user: { email } }, context).sendEmail();
    },
    async changePassword(_, { id, password }, { db, token }) {
      let res;
      const verifiedToken = verifyToken(token, id);

      if (verifiedToken.status) {
        res = await new PasswordService(
          _,
          { user: { id, password } },
          { db }
        ).change();
      }

      return res;
    },
  },
};

function verifyToken(token: string, id: string) {
  let res;
  const checkToken = new JWT().verify(token);

  if (checkToken === MESSAGES.TOKEN_VERIFICATION_FAILED) {
    res = {
      status: false,
      message: 'Token has expired',
    };
  } else {
    const user = Object.values(checkToken)[0];
    if (user.id !== id) {
      res = {
        status: false,
        message: 'User ID does not match with provided ID',
      };
    } else {
      res = {
        status: true,
        message: 'Verified token',
      };
    }
  }
  return res;
}

export default resolversEmailMutation;
