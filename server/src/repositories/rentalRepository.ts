import { database } from "../db";
import * as schema from '../../db/schema';
import { CompleteTransactionDataDTO, CreateRentalRequestDTO, PendingReqDTO, UpdateRentalStatusDTO } from "../types/rentals";
import { and, desc, eq } from "drizzle-orm";
import { user } from "../../auth-schema";

const db = database;
const rentalSchema = schema.rentalTransactions;
const bookSchema = schema.books;
const userProfileSchema = schema.userProfiles;
const userSchema = user;

const createRentalRequest = async (rentalReqData: CreateRentalRequestDTO) => {
    const rentalRequest  = await db.insert(rentalSchema).values(rentalReqData).returning();
    return rentalRequest;
}

const findPendingRequestForBook = async (pendingReqData: PendingReqDTO) => {
    const pendingRequest = await db.select().from(rentalSchema).where(and(
                                            eq(rentalSchema.bookId, pendingReqData.bookId), 
                                            eq(rentalSchema.renterId, pendingReqData.renterId),
                                            eq(rentalSchema.rentalStatus, "pending")))
                                            .limit(1);
    return pendingRequest;
}

const booksRequestedByUser = async (renterId: string) => {
    const booksRequested = await db.select({
        rental: rentalSchema,
        books: bookSchema,
        ownerName: userSchema.name,
        ownerEmail: userSchema.email,
        ownerLocation: userProfileSchema.location,
    }).from(rentalSchema).where(eq(rentalSchema.renterId, renterId))
    .leftJoin(bookSchema, eq(rentalSchema.bookId, bookSchema.id))
    .leftJoin(userProfileSchema, eq(rentalSchema.ownerId, userProfileSchema.userId))
    .orderBy(desc(rentalSchema.createdAt));

    return booksRequested;
}

const booksRequestedToUser = async (ownerId: string) => {
    const booksRequested = await db.select({
        rental: rentalSchema,
        books: bookSchema,
        renterName: userSchema.name,
        renterEmail: userSchema.email,
        renterLocation: userProfileSchema.location
    }).from(rentalSchema).where(eq(rentalSchema.ownerId, ownerId))
    .leftJoin(bookSchema, eq(rentalSchema.bookId, bookSchema.id))
    .leftJoin(userProfileSchema, eq(rentalSchema.ownerId, userProfileSchema.userId))
    .orderBy(desc(rentalSchema.createdAt));

    return booksRequested;
}

const findRentalReqById = async (transactionId: string) => {
    const transaction = await db.select().from(rentalSchema)
                                .where(eq(rentalSchema.id, transactionId));
    return transaction;
}

const updateRentalStatus = async (rentalStatusData: UpdateRentalStatusDTO) => {
    const updatedRentalStatus = await db.update(rentalSchema)
                                        .set({rentalStatus: rentalStatusData.newRentalStatus})
                                        .where(eq(rentalSchema.id, rentalStatusData.transactionId))
                                        .returning();
    return updatedRentalStatus;
}

const completeRental = async (completeTransactionData: CompleteTransactionDataDTO) => {
    const completedRental = await db.update(rentalSchema).set({
        rentalStatus: 'completed',
        ownerRating: completeTransactionData.ratings.ownerRating,
        renterRating: completeTransactionData.ratings.renterRating
    }).where(eq(rentalSchema.id, completeTransactionData.transactionId)).returning();

    return completedRental;
}

export const rentalRepository = {
    createRentalRequest,
    findPendingRequestForBook,
    booksRequestedByUser,
    booksRequestedToUser,
    findRentalReqById,
    updateRentalStatus,
    completeRental
};