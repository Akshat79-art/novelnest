import { Router } from "express";
import { rentalController } from "../controllers/rentalController";

const rentalRouter = Router();

// Create book request
rentalRouter.post('/:bookId/request', rentalController.createRequestForBookController);
rentalRouter.get('/booksRequestedByMe');
rentalRouter.get('/booksRequestedToMe');
// rentalRouter.patch('/:id/approve', rentalController.approveRental);
// rentalRouter.patch('/:id/reject', rentalController.rejectRental);
// rentalRouter.patch('/:id/complete', rentalController.completeRental);

export default rentalRouter;