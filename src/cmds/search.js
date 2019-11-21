const getBooks = require('../utils/api')
const help = require('./help')
const list = require('./list')

const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

const booksForReadingList = [];

module.exports = async (args) => {
    if (!args.hasOwnProperty('keywords')) {
        console.log("OOPS! It looks like you forgot to enter any keywords, please enter 'books search <options>' (see options below) or type 'books help' for additional menu options.")
        return help(args)
    } else {
    try {
        const keywords = args.keywords || args.k
        const books = await getBooks(keywords)
 
        console.log(`Books matching "${keywords}":`)
        console.log(books)
        rl.question(`If you would like to save any of these books to your reading list, please enter the "Result" number(s) (separated by ',') and hit enter/return.  `, (answer) => {
            let answerArr = answer.split(',')
            for (i=0; i < answerArr.length; i++) {
                switch (answerArr[i]) {
                    case '1':
                        booksForReadingList.push(books[0])
                        break;
                    case '2':
                        booksForReadingList.push(books[1]);
                        break;
                    case '3':
                        booksForReadingList.push(books[2]);
                        break;
                    case '4':
                        booksForReadingList.push(books[3]);
                        break;
                    case '5':
                        booksForReadingList.push(books[4])
                        break;
                    default:
                        'None of these results have been saved to the reading list. Please search again if you\'d like.'
                }
            }
            rl.close();
            console.log(booksForReadingList)
            console.log((booksForReadingList.length > 1) ? 
                '^ These books have been saved to your reading list. To view your reading list, type \'books list\'.' : 
                '^ This book has been saved to your reading list. To view your reading list, type \'books list\'.')
        })
    } catch (err) {
        console.error(err)
    }
    }

} 