import { IResolvers } from 'graphql-tools';
import { transport } from '../../config/mailer';

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
  },
};

export default resolversEmailMutation;
