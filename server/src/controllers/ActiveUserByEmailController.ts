import User from '@app/entities/User';
import { Response, Request } from 'express';

class ActiveUserByEmailController {
    async handle(request: Request, response: Response) {
        const userId = request.params.userId;
        const token = request.query.token;

        const user = await User.findOne(userId);
        if (!user) {
            return response.sendStatus(404);
        }
        if (user.emailConfirmationToken !== token) {
            return response.sendStatus(403);
        }

        user.actived = true;
        await user.save();

        return response.json({ message: 'user actived', user });
    }
}

export default ActiveUserByEmailController;
