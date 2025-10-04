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

export const rentalController = {
    createRequestForBookController
};