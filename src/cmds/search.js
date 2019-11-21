const ora = require('ora')
const getBooks = require('../utils/api')
const help = require('./help')

module.exports = async (args) => {
    if (!args.hasOwnProperty('keywords')) {
        console.log("OOPS! It looks like you forgot to enter any keywords, please enter 'books search <options>' (see options below) or type 'books help' for additional menu options.")
        return help(args)
    } else {
    const spinner = ora().start()
    try {
        const keywords = args.keywords || args.k
        const books = await getBooks(keywords)

        spinner.stop()

        const booksMap = await books.map((element, index) => {
            if (element.volumeInfo.authors === undefined || element.volumeInfo.authors.length === 1) {
                return `${index+1}. Title: ${element.volumeInfo.title}, Author: ${element.volumeInfo.authors || 'none listed'}, Publisher: ${element.volumeInfo.publisher}`
            } else {
                let authors = element.volumeInfo.authors.map((a)=> ` ${a}` )
                return `${index+1}. Title: ${element.volumeInfo.title}, Authors: ${authors}, Publisher: ${element.volumeInfo.publisher}`
            }
        })
        console.log(`Books matching "${keywords}":`)
        console.log(booksMap)
    } catch (err) {
        spinner.stop()
        console.error(err)
    }
    }

} 