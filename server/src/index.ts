import express from 'express';
import booksRouter from './routers/bookRouter';
import userRouter from './routers/userRouter';
import * as schema from '../../src/db/schema';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const db = drizzle(process.env.DATABASE_URL!, {schema});
export const database = db;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api/books', booksRouter);
app.use('api/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
