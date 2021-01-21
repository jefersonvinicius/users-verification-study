import express from 'express';
import { createConnection } from 'typeorm';
import User from './entities/User';

const app = express();

app.get('/', async (_, response) => {
    const user = new User();
    user.email = 'teste@gmail.com';
    user.phone = '4444';
    user.password = '123';
    user.name = 'Teste';
    await user.save();
    return response.json(user);
});

app.listen(3000, async () => {
    await createConnection();
    console.log('Serving in http://localhost:3000');
});
