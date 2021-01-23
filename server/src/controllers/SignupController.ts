import User from '@app/entities/User';
import { isEmailOrPhoneAlreadyUsed } from '@app/utils/validators';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

export default class SignupController {
    async handle(request: Request, response: Response) {
        const { name, email, password, phone } = request.body;

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array());
        }

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.phone = phone;
        await user.save();

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
        body().custom(isEmailOrPhoneAlreadyUsed),
    ];
}
