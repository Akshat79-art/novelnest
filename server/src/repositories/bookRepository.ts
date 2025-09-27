import { eq } from 'drizzle-orm';
import * as schema from '../../db/schema';
import { database } from '../db';

const db = database;
const books = schema.books;

const getAllBooks = async () => {
    const allBooks = await db.select().from(books);
    console.log(allBooks);
    return allBooks;
}

const getBookByName = async (bookName: string) => {
    const book = await db.select().from(books).where(eq(books.title, bookName));
    return book;
}

export const bookRepository = { 
    getAllBooks,
    getBookByName
};