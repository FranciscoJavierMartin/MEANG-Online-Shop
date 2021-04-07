import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';
import { COLLECTIONS, EXPIRETIME, MESSAGES } from '../../config/constants';
import { transport } from '../../config/mailer';
import { findOneElement, updateOneElement } from '../../lib/db-operations';
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
    async resetPassword(_, { email }, { db }) {
      let res;
      const user = await findOneElement(db, COLLECTIONS.USERS, { email });

      if (user) {
        const token = new JWT().sign({ user }, EXPIRETIME.H1);

        const html = `Click <a href="${process.env.CLIENT_URL}/#/active/${token}">here</a> to reset your password.`;
        res = new Promise((resolve, reject) => {
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
    async changePassword(_, { id, password }, { db, token }) {
      let res;
      const verifiedToken = verifyToken(token, id);

      if (verifiedToken.status) {
        if (id && password) {
          const { result } = await updateOneElement(db, COLLECTIONS.USERS, id, {
            password: bcrypt.hashSync(password, 10),
          });

          if (result.nModified === 1 && result.ok) {
            res = {
              status: true,
              message: 'Password changed',
            };
          } else {
            res = {
              status: false,
              message: 'Password has not been changed',
            };
          }
        } else {
          res = {
            status: false,
            message: 'Invalid params',
          };
        }
      } else {
        res = {
          status: false,
          message: verifiedToken.message,
        };
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
