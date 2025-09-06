import { bookRepository } from "../repositories/bookRepository";

const getAllBooks = async () => {
    try {
        const allBooks = await bookRepository.getAllBooks();
        return allBooks;
    } catch (error) {
        console.error(error);
    }
};

const getBookByName = async (bookName: string) => {
    try {
        const book = await bookRepository.getBookByName(bookName);
        return book;
    } catch (error) {
        console.error(error);
    }
};

export const bookService = { 
    getAllBooks,
    getBookByName
};