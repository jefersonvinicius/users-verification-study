import express from 'express';

const app = express();

app.get('/', (_, response) => {
    return response.json({ message: 'teste' });
});

app.listen(3000, () => {
    console.log('Serving in http://localhost:3000');
});
