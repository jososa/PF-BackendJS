import mailer from "nodemailer"
import { environment } from "../../config/config.js"

export default class MailingService {
    constructor() {
      this.client = mailer.createTransport({
        service: environment.mailing.SERVICE,
        host: environment.mailing.HOST,
        port: 587,
        auth: {
          user: environment.mailing.USER,
          pass: environment.mailing.PASSWORD,
        },
      })
    }
  
    sendMail = async ({ from, to, subject, html, attachments = [] }) => {
      let result = await this.client.sendMail({
        from,
        to,
        subject,
        html,
        attachments,
      })
      return result
    }
  }