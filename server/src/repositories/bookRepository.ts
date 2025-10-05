import { eq } from 'drizzle-orm';
import * as schema from '../../db/schema';
import { database } from '../db';
import { BookUpdateDTO } from '../types/book';

const db = database;
const books = schema.books;

const getAllBooks = async () => {
    const allBooks = await db.select().from(books);
    console.log(allBooks);
    return allBooks;
}

const getBookById = async (bookId: string) => {
    const book = await db.select().from(books).where(eq(books.id, bookId));
    return book;
}

const getBookByName = async (bookName: string) => {
    const book = await db.select().from(books).where(eq(books.title, bookName));
    return book;
}

const getBookByIsbn = async (isbn: string) => {
    const book = await db.select().from(books).where(eq(books.isbn, isbn));
    return book;
}

const updateBookStatus = async (bookUpdateData: BookUpdateDTO) => {
    const updatedBook = await db.update(books).set({status: bookUpdateData.newBookStatus})
                                .where(eq(books.id, bookUpdateData.bookId))
                                .returning();
    return updatedBook;
}

export const bookRepository = { 
    getAllBooks,
    getBookById,
    getBookByName,
    getBookByIsbn,
    updateBookStatus
};