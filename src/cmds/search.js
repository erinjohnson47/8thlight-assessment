const ora = require('ora')
const getBooks = require('../utils/api')

module.exports = async (args) => {
    const spinner = ora().start()

    try {
        const keywords = args.keywords || args.k
        const books = await getBooks(keywords)

        spinner.stop()
        const booksMap = books.map((element, index) => {
            if (element.volumeInfo.authors.length > 1) {
                let authors = element.volumeInfo.authors.map((a)=> ` ${a}` )
                console.log(authors, 'authors map')
                return `${index+1}. Title: ${element.volumeInfo.title}, Authors: ${authors}, Publisher: ${element.volumeInfo.publisher}`
            } else {
            return `${index+1}. Title: ${element.volumeInfo.title}, Author: ${element.volumeInfo.authors[0]}, Publisher: ${element.volumeInfo.publisher}`
            }
        })
        console.log(`Books matching ${keywords}:`)
        console.log(booksMap)
    } catch (err) {
        spinner.stop()

        console.error(err)
    }

} 