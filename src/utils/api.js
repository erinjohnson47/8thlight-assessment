const axios = require('axios');
const config = require('../../config');

module.exports = async (args) => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: args,
        key: config.GOOGLE_BOOKS_API_KEY,
        maxResults: 5,
        orderBy: 'relevance',
      },
    });
    // API call returns an array of 5 objects
    const books = response.data.items;

    // map through the objects
    const booksMap = await books.map((book, index) => ({
      Result: index + 1,
      Title: book.volumeInfo.title || 'none listed',
      Authors: book.volumeInfo.authors
        ? book.volumeInfo.authors.join(', ') : 'none listed',
      Publisher: book.volumeInfo.publisher || 'none listed',
    }));
    return booksMap;
  } catch (error) {
    console.error(error);
  }
};
