import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';

import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';

import userRouter from './routers/userRouter';
import bookRouter from './routers/bookRouter';
import rentalRouter from './routers/rentalRouter';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/api/books", bookRouter);
app.use('/api/user', userRouter);
app.use('/api/rental', rentalRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
