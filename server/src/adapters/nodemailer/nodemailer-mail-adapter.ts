import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ca32a9912d7102",
        pass: "97f255e954538e"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feeget <oi@feedget.com>',
            to: 'George Guilherme <george.gui2000@gmail.com>',
            subject,
            html: body,
        });
    };
}