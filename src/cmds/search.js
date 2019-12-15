const getBooks = require('../utils/api')
const help = require('./help')
const fileSystem = require('fs')

//to accept user input in command line
const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

//empty array to push saved books to reading list
const booksForReadingList = [];

const bookFormat = (arrayOfBooks) => {
    arrayOfBooks.map(book => {
        if (book.Result) {
            console.log(`
        Result: ${book.Result}
        Title: ${book.Title}
        Author(s): ${book.Authors}
        Publisher: ${book.Publisher}`)
        } else {
            console.log(`
        Title: ${book.Title}
        Author(s): ${book.Authors}
        Publisher: ${book.Publisher}`)
        }
    })
    
}

//position in the reading list the new books should be appended
let position = 19;

//the file path for the reading list
const filePath = 'src/cmds/list.js';

module.exports = async (args) => {
    //if the args don't contain the 'keyword' or 'k' prop, let user know search parameters are missing and display correct syntax
    if (!(args.hasOwnProperty('keywords') || args.hasOwnProperty('k'))) {
        console.log("OOPS! It looks like you forgot to enter any keywords, please enter 'books search <options>' (see options below) or type 'books help' for additional menu options.")
        return help({ _: [ 'search' ] })
    //pass the keywords as argument for getBooks, which queries the API
    } else {
        try {
            const keywords = args.keywords || args.k
            const books = await getBooks(keywords)
            console.log(`Books matching "${keywords}":`)
            await bookFormat(books);
            //after displaying books, ask if user would like to save any of the results to reading list
            rl.question(`If you would like to save any of these books to your reading list, please enter the corresponding Result number(s).  `, (answer) => {

                //for each corresponding result, delete "result" property, as it is not relevant in reading list, then push that result to booksForReadingList array to be saved
                for (i=0; i < answer.length; i++) {
                    switch (answer[i]) {
                        case "1":
                            delete books[0].Result;
                            booksForReadingList.push(books[0]);
                            break;
                        case "2":
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
                //close readline
                rl.close();

                //if the readinglist array contains items:
                if (booksForReadingList.length) {
                    let booksJson = JSON.stringify(booksForReadingList)

                        //read the existing list file
                        fileSystem.readFile(filePath, (err, data) => {
                            if (err) {
                                throw err;
                            }
                            let fileContent = data.toString();
                            fileContent = fileContent.substring(position);
                            //open file, r+ = for reading and writing
                            let file = fileSystem.openSync(filePath,'r+');
                            
                            //add exising file content to new file content so it is not overwritten
                            let buffer = Buffer.from(`${(booksJson)}, ${fileContent}`);
                                    //write file specifying file, content, length of content, and position of where to write new conent
                            fileSystem.writeSync(file, buffer, 0, buffer.length, position);
                                    //alert user that their choices have been saved to reading list
                        });
                    bookFormat(booksForReadingList);
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