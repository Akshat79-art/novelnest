import { Request, Response } from 'express'
import { bookService } from '../services/bookService';

const serverErrorMsg = "Internal Server Error";

const getAllBooks = async(req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error in getAllBooks in bookController:', error);
        res.status(500).json({message: serverErrorMsg});
    }
}

const getBookByName = async(req: Request, res: Response) => {
    try {
        const bookName = req.params['bookName'];
        console.log(bookName);
        bookService.getBookByName(bookName);
    } catch (error) {
        console.error('Error in getBookByName in bookController:', error);
        res.status(500).json({message: serverErrorMsg});
    }
}

export const bookController = {
    getAllBooks,
    getBookByName
};