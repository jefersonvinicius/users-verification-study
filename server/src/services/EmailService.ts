import nodemailer from 'nodemailer';

export default class EmailService {
    send() {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'user@gmail.com',
                pass: 'pass',
            },
        });
    }
}
