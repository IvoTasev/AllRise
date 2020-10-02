import express from 'express';
import cors from 'cors'
import db from './database/database';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(require('./routers/router.js').default);

app.listen(port, () =>
    console.log('Listening on port ' + `${port}`)
);

export default app;


