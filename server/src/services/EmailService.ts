import User from '@app/entities/User';
import nodemailer from 'nodemailer';

export default class EmailService {
    static sendConfirmationEmailTo(user: User) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        transporter.sendMail({
            to: user.email,
            subject: 'Confirmação',
            html: `
                <h3>Olá ${user.name}</h3>
                Seja bem vindo na nossa plataforma

                Confirme seu email clicando no link abaixo: <br/>
                <a href="${user.createConfirmationURL()}">Link de confirmação</a>
            `,
        });
    }
}
