const Book = require("../models/Book");

exports.getAllBooks = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const books = await Book.find().skip(skip).limit(limit);
  const total = await Book.countDocuments();
  return { books, total };
};

exports.getBookById = async (bookId) => {
  const book = await Book.findById(bookId);
  if (!book) throw new Error("Book not found");
  return book;
};
