const readline = require('readline');
const getBooks = require('../utils/api');
const help = require('./help');
const ReadingList = require('./list');

// to accept user input in command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Search {
  constructor(args) {
    // pass the keywords as argument for getBooks, which queries the API
    this.keywords = Search.checkArgs(args);
    this.books = Search.getBooksFromAPI();
    this.answer = '';
    this.booksForReadingList = [];
  }

  static checkArgs(args) {
    // if the args don't contain the 'keyword' or 'k' prop,
    // let user know search parameters are missing and display correct syntax
    if (!(args.k || args.keywords)) {
      console.log(`================================
      OOPS! It looks like you forgot to enter any keywords, please enter 'books search <options>' (see options below) or type 'books help' for additional menu options.`);
      return help({ _: ['search'] });
    }
    this.keywords = args.keywords || args.k;
    return this;
  }

  static async getBooksFromAPI() {
    this.displayBookResults();
    const books = await getBooks(this.keywords);
    this.books = books;
    this.bookFormat(this.books);
    this.askToSaveToList();
  }

  static bookFormat(arrayOfBooks) {
    arrayOfBooks.map((book) => {
      if (book.Result) {
        console.log(`  Result: ${book.Result}
  Title: ${book.Title}
  Author(s): ${book.Authors}
  Publisher: ${book.Publisher}
  ================================`);
      } else {
        console.log(`  ================================
  Title: ${book.Title}
  Author(s): ${book.Authors}
  Publisher: ${book.Publisher}
  ================================`);
      }
    });
  }

  static displayBookResults() {
    console.log(`  ================================
  Books matching "${this.keywords}":
  ================================`);
  }

  static askToSaveToList() {
    // after displaying books, ask if user would like to save any of the results to reading list
    rl.question('If you would like to save any of these books to your reading list, please enter the corresponding Result number(s).  ', (answer) => {
      this.answer = answer;
      this.booksToSave(this.answer);

      // close readline
      rl.close();
    });
  }

  static booksToSave(answer) {
    const selectedBooks = [];
    // for each corresponding result, delete "result" property, not relevant in reading list, then push that result to booksForReadingList array to be saved

    if (answer.length > 0) {
      for (let i = 0; i < answer.length; i++) {
        switch (answer[i]) {
          case '1':
            delete this.books[0].Result;
            selectedBooks.push(this.books[0]);
            break;
          case '2':
            delete this.books[1].Result;
            selectedBooks.push(this.books[1]);
            break;
          case '3':
            delete this.books[2].Result;
            selectedBooks.push(this.books[2]);
            break;
          case '4':
            delete this.books[3].Result;
            selectedBooks.push(this.books[3]);
            break;
          case '5':
            delete this.books[4].Result;
            selectedBooks.push(this.books[4]);
            break;
          default:
            break;
        }
      }
      this.booksForReadingList = [...selectedBooks];
      const list = new ReadingList(this.booksForReadingList);
      this.bookFormat(list.booksFromSearch);
      list.saveBooksToFile();
    }
  }
}

module.exports = Search;
