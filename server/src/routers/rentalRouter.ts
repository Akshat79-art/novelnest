import { Router } from "express";
import { rentalController } from "../controllers/rentalController";
import { requireAuth } from "../lib/middleware";

const rentalRouter = Router();

// Create book request
rentalRouter.post('/:bookId/request', requireAuth, rentalController.createRequestForBookController);
rentalRouter.get('/booksRequestedByUser', requireAuth, rentalController.booksRequestedByUserController);
rentalRouter.get('/booksRequestedToUser', requireAuth, rentalController.booksRequestedToUserController);
rentalRouter.patch('/:transactionId/approve', requireAuth,rentalController.approveTransactionController);
rentalRouter.patch('/:transactionId/reject', requireAuth, rentalController.rejectTransactionController);
// rentalRouter.patch('/:transactionId/complete', requireAuth, rentalController.completeRental);

export default rentalRouter;