const config = require('../../config');
const axios = require('axios');

module.exports = async (args) => {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: args,
                key: config.GOOGLE_BOOKS_API_KEY,
                maxResults: 5,
                orderBy: "relevance"
            }
        })
        //API call returns an array of 5 objects
        const books = response.data.items

        //map through the objects
        const booksMap = await books.map((book, index) => {
            return (
                { 
                    Result: index+1,
                    Title: book.volumeInfo.title,
                    Authors: book.volumeInfo.authors.length ?
                        book.volumeInfo.authors.toString() || 'none listed' 
                        : book.volumeInfo.authors.join(','),
                    Publisher: book.volumeInfo.publisher || 'none listed'
                }
            )
        })
        return booksMap

    } catch (error) {
        console.error(error)
    }
}