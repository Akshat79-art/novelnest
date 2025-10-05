import { bookRepository } from "../repositories/bookRepository"
import { rentalRepository } from "../repositories/rentalRepository";
import { CreateRentalRequestCtoSDTO } from "../types/rentals"

/**
 * Make the return value more resourceful.
 * @param requestData 
 * @returns 
 */
const createRentalRequestForBookService = async (requestData: CreateRentalRequestCtoSDTO) => {

    try {
        const bookId = requestData.bookId;
        const bookRow = await bookRepository.getBookById(bookId);
        if(bookRow.length == 0){
            throw new Error('Book not found!');
        }

        const [book] = bookRow;
        if(book.status !== 'available'){
            throw new Error("Book not available");
        }
        if(book.ownerId === requestData.renterId){
            throw new Error("Cannot rent your own book");
        }

        const renterId = requestData.renterId;
        const pendingReqData = {bookId, renterId};
        const existingRequestRow = await rentalRepository.findPendingRequestForBook(pendingReqData);
        if(existingRequestRow.length == 1){
            throw new Error('You already have a pending request for this book');
        }

        const today = new Date();
        const startDate = requestData.startDate;
        const endDate = requestData.endDate;

        if(startDate < today){
            throw new Error('Start date cannot be in the past');
        }
        if(endDate <= startDate){
            throw new Error('End date must be after start date');
        }

        const rentalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = book.pricePerDay ? book.pricePerDay*rentalDays : 0;
        const rentalReqData = {...requestData, ownerId: book.ownerId, totalPrice};

        const rentalRequest = await rentalRepository.createRentalRequest(rentalReqData);

        return [rentalRequest];

    } catch (error) {
        console.error("Something went wrong in service layer.")
        return [{error: "Something went wrong in service layer."}];
    }
}
 
const booksRequestedByUserService = async (renterId: string) => {
    try{
        const rentals = await rentalRepository.booksRequestedByUser(renterId);

        return rentals.map(rental => ({
            rentalT: rental.rental,
            books: rental.books,
            owner: [rental.ownerName, rental.ownerEmail, rental.ownerLocation]
        }))
    } catch (error: any){
        console.error("Error in service for books requested by user:");
        console.error(error);
    }
}

export const rentalService = {
    createRentalRequestForBookService,
    booksRequestedByUserService
}