import { database } from "../db";
import * as schema from '../../db/schema';
import { CreateRentalRequestDTO, PendingReqDTO } from "../types/rentals";
import { and, eq } from "drizzle-orm";

const db = database;
const rentalSchema = schema.rentalTransactions;

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

export const rentalRepository = {
    createRentalRequest,
    findPendingRequestForBook
};