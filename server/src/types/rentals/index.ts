export interface CreateRentalRequestCtoSDTO {
    bookId: string,
    renterId: string,
    startDate: Date,
    endDate: Date
};

export interface CreateRentalRequestDTO {
    bookId: string,
    renterId: string,
    startDate: Date,
    endDate: Date,
    ownerId: string,
    totalPrice: number
};

export interface PendingReqDTO {
    bookId: string,
    renterId: string
}