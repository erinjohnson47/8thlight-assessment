const getBooks = require('../utils/api')
const help = require('./help')
const fs = require('fs')

const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

const booksForReadingList = [];
let position = 19;
const filePath = 'src/cmds/list.js';

module.exports = async (args) => {

    if (!args.hasOwnProperty('keywords')) {
        console.log("OOPS! It looks like you forgot to enter any keywords, please enter 'books search <options>' (see options below) or type 'books help' for additional menu options.")
        return help({ _: [ 'search' ] })
    } else {
        try {
            const keywords = args.keywords || args.k
            const books = await getBooks(keywords)
    
            console.log(`Books matching "${keywords}":`)
            console.log(books)
            rl.question(`If you would like to save any of these books to your reading list, please enter the "Result" number(s, separated by ',') and hit enter/return.  `, (answer) => {
                let answerArr = answer.split(',')
                for (i=0; i < answerArr.length; i++) {
                    switch (answerArr[i]) {
                        case '1':
                            delete books[0].Result;
                            booksForReadingList.push(books[0]);
                            break;
                        case '2':
                            delete books[1].Result;
                            booksForReadingList.push(books[1]);
                            break;
                        case '3':
                            delete books[2].Result;
                            booksForReadingList.push(books[2]);
                            break;
                        case '4':
                            delete books[3].Result;
                            booksForReadingList.push(books[3]);
                            break;
                        case '5':
                            delete books[4].Result;
                            booksForReadingList.push(books[4])
                            break;
                        default:
                            null
                            break;
                    }
                }
                rl.close();
                if (booksForReadingList.length) {

                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            throw err;
                        }
                        let fileContent = data.toString();
                        fileContent = fileContent.substring(position);
                        let file = fs.openSync(filePath,'r+');
                        let buffer = Buffer.from(`${JSON.stringify(booksForReadingList)},${fileContent}`);
                        fs.writeSync(file, buffer, 0, buffer.length, position);
                        // fs.close(file);
                    });

                        console.log(booksForReadingList);
                        (booksForReadingList.length > 1) ? 
                            console.log('^ These books have been saved to your reading list. To view your reading list, type \'books list\'.')
                            : console.log('^ This book has been saved to your reading list. To view your reading list, type \'books list\'.')
                } else {
                    console.log("No books have been saved to your reading list at this time.");
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

} 