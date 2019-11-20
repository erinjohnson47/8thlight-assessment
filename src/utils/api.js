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
        console.log(response.data.items, 'this is the books api')

    } catch (error) {
        console.error(error)
    }
}