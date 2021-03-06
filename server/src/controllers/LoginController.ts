import User from '@app/entities/User';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default class LoginController {
    async handle(request: Request, response: Response) {
        const { email, phone, password = '' } = request.body;

        const user = await User.findOne({ where: [{ email }, { phone }] });
        if (!user) {
            return response.status(404).json({ message: 'user not found' });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return response.status(401).json({ message: 'password incorrect' });
        }

        if (!user.actived) {
            return response.status(403).json({ message: 'user not actived' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '');

        return response.json({ user, token });
    }
}
