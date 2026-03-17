export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    description: string;
    bookCondition: string;
    status: string;
    coverImage: string;
    pricePerDay: number | null;
    maxRentalDays: number;
    ownerId: string;
    createdAt: string;
}