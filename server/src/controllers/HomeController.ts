import { Response, Request } from 'express';

class HomeController {
    handle(request: Request, response: Response) {
        const userId = request.userId;
        return response.json({ message: 'auth successffuly', userId });
    }
}

export default HomeController;
