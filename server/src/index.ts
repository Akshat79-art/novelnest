import express from 'express';
import * as dotenv from 'dotenv';

import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';

import userRouter from './routers/userRouter';
import bookRouter from './routers/bookRouter';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

console.log("Auth:", auth);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/api/books", bookRouter);
app.use('api/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
