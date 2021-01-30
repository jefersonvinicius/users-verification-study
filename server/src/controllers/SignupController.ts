import User from '@app/entities/User';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import EmailService from '@app/services/EmailService';

export default class SignupController {
    async handle(request: Request, response: Response) {
        const { name, email, password, phone, verifyBy } = request.body;

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array());
        }

        const userExists = await User.findOne({ where: [{ email }, { phone }] });
        if (userExists) {
            const message = userExists.email === email ? 'email already registered' : 'phone already registered';
            return response.status(409).json({ message });
        }

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.phone = phone;
        await user.save();

        EmailService.sendConfirmationEmailTo(user);

        return response.json(user);
    }

    validations = [
        body('name', 'name empty').not().isEmpty(),
        body('email', 'email invalid').isEmail(),
        body('password', 'password must be bigger then 5').isLength({
            min: 6,
        }),
        body('phone', 'phone must be phone valid number').isMobilePhone('pt-BR'),
        body('verifyBy', 'verify must be by email or phone').isIn(['email', 'phone']),
    ];
}
