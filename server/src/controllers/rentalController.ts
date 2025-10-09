import { Request, Response } from 'express';
import { rentalService } from '../services/rentalService';

const createRequestForBookController = async(req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const renterId = req.user?.id ;
        const { startDate, endDate } = req.body;

        if (renterId == undefined) {
            return res.status(400).json({ 
                error: 'User not authorized.' 
            }); 
        }
        else if (!startDate || !endDate) {
            return res.status(400).json({ 
                error: 'Start date and end date are required' 
            });
        } 

        const rentalRequest = await rentalService.createRentalRequestForBookService({
            bookId,
            renterId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        });

        res.status(201).json({
            message: 'Rental request submitted successfully',
            request: rentalRequest
        });
    } catch (error: any) {
        console.error('Create rental request error:', error);
      
        if (error.message.includes('not found') ||  error.message.includes('not available') ||
            error.message.includes('your own book') || error.message.includes('already have')) {
            return res.status(400).json({ error: error.message });
        }
      
        res.status(500).json({ error: 'Failed to create rental request' });
    }
}

const booksRequestedByUserController = async (req: Request, res: Response) => {
    try {
        const renterId = (req as any).user.id;
        const booksRequested = await rentalService.booksRequestedByUserService(renterId);
        return booksRequested;
    } catch (error: any) {
        console.error('Error in fetching books requested by user controller.', error);
        res.status(500).json({error: 'Failed to fetch incoming requests'});
    }
}

const booksRequestedToUserController = async (req: Request, res: Response) => {
    try {
        const ownerId = (req as any).user.id;
        const incomingBooksRequested = await rentalService.booksRequestedToUserService(ownerId);
        return incomingBooksRequested;
    } catch (error: any) {
        console.error('Error in fetching books requested to user controller.', error);
        res.status(500).json({error: 'Failed to fetch incoming requests'});
    }
}

/**
 * Make the return value more concise.
 * @param req 
 * @param res 
 * @returns 
 */
const approveTransactionController = async (req: Request, res: Response) => {
    try {
        const transactionId = req.params.transactionId;
        const ownerId = (req as any).user.id;
        const approvedRental = await rentalService.approveTransactionService({transactionId, ownerId});

        res.json({
            message: 'Rental request approved successfully',
            rental: approvedRental
        })
    } catch (error: any) {
        console.error('Error in approving transaction requested to controller.', error);
        if (error.message.includes('not found') || 
            error.message.includes('Only the book owner') ||
            error.message.includes('Cannot approve')){
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({error: 'Failed to approve incoming requests'});
    }
}

const rejectTransactionController = async (req: Request, res: Response) => {
    try {
        const transactionId = req.params.transactionId;
        const ownerId = (req as any).user.id;
        const rejectRental = await rentalService.rejectTransactionService({transactionId, ownerId});

        res.json({
            message: 'Rental request rejected successfully',
            rental: rejectRental
        })
    } catch (error: any) {
        console.error('Error in rejecting transaction requested to controller.', error);
        if (error.message.includes('not found') || 
            error.message.includes('Only the book owner') ||
            error.message.includes('Cannot reject')){
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({error: 'Failed to reject rental request.'});
    }
}

const completeTransactionController = async (req: Request, res: Response) => {
    try {
        const transactionId = req.params.transactionId;
        const ownerId = (req as any).user.id;
        const ownerRating = Number(req.params.ownerRating);
        const renterRating = Number(req.params.renterRating);
        const completeTransaction = await rentalService.completeTransactionService({
            transactionId, 
            ownerId,
            ratings: { ownerRating, renterRating}
        });

        res.json({
            message: 'Rental request rejected successfully',
            rental: completeTransaction
        })
    } catch (error: any) {
        console.error('Error in completing transaction requested to controller.', error);
        if (error.message.includes('not found') || error.message.includes('Only the book owner') ||
            error.message.includes('Cannot complete') || 
            error.message.includes('rating must be between'))
        {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({error: 'Failed to complete rental request.'});
    }
}

export const rentalController = {
    createRequestForBookController,
    booksRequestedByUserController,
    booksRequestedToUserController,
    approveTransactionController,
    rejectTransactionController,
    completeTransactionController
};