import { transport } from '../config/mailer';
import { IMailOptions } from '../interfaces/email.interface';

class MailService {
  send(mail: IMailOptions) {
    return new Promise<{ status: boolean; message: string }>(
      (resolve, reject) => {
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
      }
    );
  }
}

export default MailService;
