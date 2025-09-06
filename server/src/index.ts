import express from 'express'
import booksRouter from './routers/bookRouter';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api/books', booksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
