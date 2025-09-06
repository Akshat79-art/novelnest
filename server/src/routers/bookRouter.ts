import { Router } from 'express';
import { bookController } from '../controllers/bookController';

const bookRouter = Router();
 
bookRouter.get('/', bookController.getAllBooks);
bookRouter.get('/:bookName', bookController.getBookByName);

export default bookRouter;