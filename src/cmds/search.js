const ora = require('ora')
const getBooks = require('../utils/api')

module.exports = async (args) => {
    const spinner = ora().start()

    try {
        const keywords = args.keywords || args.k
        const books = await getBooks(keywords)

        spinner.stop()

        console.log(`Books matching ${keywords}:`)
        console.log(books)
    } catch (err) {
        spinner.stop()

        console.error(err)
    }

} 