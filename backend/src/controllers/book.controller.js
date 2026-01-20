const bookService = require("../services/book.service");

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const { books, total } = await bookService.getAllBooks(page, limit);
    res.json({
      books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
