import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME, MESSAGES } from '../../config/constants';
import { transport } from '../../config/mailer';
import { findOneElement } from '../../lib/db-operations';
import JWT from '../../lib/jwt';
import UserService from '../../services/user.service';

const resolversEmailMutation: IResolvers = {
  Mutation: {
    async sendEmail(_, { mail }) {
      return new Promise((resolve, reject) => {
        transport.sendMail(
          {
            from: `"Gamezonia Online shop" <${process.env.USER_EMAIL}>`,
            to: mail.to,
            subject: mail.subject,
            html: mail.html,
          },
          (error, _) =>
            error
              ? reject({ status: false, message: error })
              : resolve({ status: true, message: 'Email sent' })
        );
      });
    },
    async activeUserEmail(_, { id, email }) {
      const token = new JWT().sign({ user: { id, email } }, EXPIRETIME.H1);
      const html = `Click <a href="${process.env.CLIENT_URL}/#/active/${token}">here</a> to activate your account.`;
      return new Promise((resolve, reject) => {
        transport.sendMail(
          {
            from: `"Gamezonia Online shop" <${process.env.USER_EMAIL}>`,
            to: email,
            subject: 'Activate your account',
            html,
          },
          (error, _) =>
            error
              ? reject({ status: false, message: error })
              : resolve({ status: true, message: 'Email sent' })
        );
      });
    },
    async activeUserAction(_, { id, dateOfBirth, password }, { db, token }) {
      let res;
      const checkToken = new JWT().verify(token);
      if (checkToken === MESSAGES.TOKEN_VERIFICATION_FAILED) {
        res = {
          status: false,
          message: 'Activation time has expired. Please contact with an admin',
        };
      } else {
        const user = Object.values(checkToken)[0];

        if (user.id !== id) {
          res = {
            status: false,
            message: 'Token Id does not match with provided Id',
          };
        } else {
          res = new UserService(
            _,
            { id, user: { dateOfBirth, password } },
            { token, db }
          ).unblock(true);
        }
      }

      return res;
    },
    async resetPassword(_, { email }, { db }) {
      let res;
      const user = await findOneElement(db, COLLECTIONS.USERS, { email });

      if (user) {
        const token = new JWT().sign({ user }, EXPIRETIME.H1);

        const html = `Click <a href="${process.env.CLIENT_URL}/#/active/${token}">here</a> to reset your password.`;
        return new Promise((resolve, reject) => {
          transport.sendMail(
            {
              from: `"Gamezonia Online shop" <${process.env.USER_EMAIL}>`,
              to: email,
              subject: 'Change password',
              html,
            },
            (error, _) =>
              error
                ? reject({ status: false, message: error })
                : resolve({ status: true, message: 'Email sent' })
          );
        });
      } else {
        res = {
          status: false,
          message: `User with email ${email} does not exist.`,
        };
      }

      return res;
    },
  },
};

export default resolversEmailMutation;
