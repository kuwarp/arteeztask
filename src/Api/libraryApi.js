const Book= require('../DB/librarySchema')
const User = require('../DB/authSchema')

// Adding Books in Stores 

const createBooks=async (req, res) => {
    try {
        const { title, author, ISBN, quantity } = req.body;
        const newBook = new Book({ title, author, ISBN, quantity });
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get all books
const getAllBooks= async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Borrow a book


const borrowBook=  async (req, res) => {
    try {
        const { bookId, userId } = req.params;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ error: 'User or book not found' });
        }

        if (book.quantity <= 0) {
            return res.status(400).json({ error: 'No copies available for borrowing' });
        }

        user.books.push(book);
        user.save();

        book.quantity -= 1;
        book.save();

        res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Return a book

const returnBook=  async (req, res) => {
    try {
        const { bookId, userId } = req.params;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ error: 'User or book not found' });
        }

        const bookIndex = user.books.indexOf(book._id);
        if (bookIndex === -1) {
            return res.status(400).json({ error: 'Book not borrowed by the user' });
        }

        user.books.splice(bookIndex, 1);
        user.save();

        book.quantity += 1;
        book.save();

        res.json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get user's book list


const listOfBooks=async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('books');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.books);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports={
    createBooks,
    getAllBooks,
    borrowBook,
    returnBook,
    listOfBooks
}