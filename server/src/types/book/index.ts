export interface BookUpdateDTO{
    bookId: string,
    newBookStatus: "available" | "rented" | "unavailable"
};