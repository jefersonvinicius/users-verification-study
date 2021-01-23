import express from 'express';
import { createConnection } from 'typeorm';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, async () => {
    await createConnection();
    console.log('Serving in http://localhost:3000');
});
