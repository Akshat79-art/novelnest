import express from 'express'
import booksRouter from './routers/bookRouter';
import * as schema from '../../src/db/schema';
import { drizzle } from 'drizzle-orm/neon-http';

const app = express();
const port = process.env.PORT || 3001;
export const database = drizzle(process.env.DATABASE_URL!, {schema});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api/books', booksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
