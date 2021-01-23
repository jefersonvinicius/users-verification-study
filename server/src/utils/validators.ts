import User from '@app/entities/User';
import { Meta } from 'express-validator';

export async function isEmailOrPhoneAlreadyUsed(_: any, { req }: Meta) {
    const { email, phone } = req.body;
    const user = await User.findOne({ where: [{ email }, { phone }] });
    if (user?.email === email) {
        return Promise.reject('email already used');
    }
    if (user?.phone === phone) {
        return Promise.reject('phone already used');
    }
}
