import express from 'express';
import * as schema from '../db/schema';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { toNodeHandler } from "better-auth/node";
import userRouter from './routers/userRouter';
import bookRouter from './routers/bookRouter';
import { auth } from './lib/auth';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const db = drizzle(process.env.DATABASE_URL!, {schema});
export const database = db;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/books", bookRouter);
app.use('api/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
