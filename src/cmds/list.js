const readingList = [];

const fs = require('fs');

class ReadingList {
  constructor(list) {
    // get list of books from search class
    this.booksFromSearch = list;
  }

  jsonStringifyResults() {
    const booksJson = JSON.stringify(this.booksFromSearch);
    return booksJson;
  }

  saveBooksToFile() {
    // position in the reading list the new books should be appended
    const insertPosition = 21;

    // the file path for the reading list
    const filePath = 'src/cmds/list.js';

    // stringify results to write to file
    const books = this.jsonStringifyResults();

    // read the existing list file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      let fileContent = data.toString();
      fileContent = fileContent.substring(insertPosition);
      // open file, r+ = for reading and writing
      const file = fs.openSync(filePath, 'r+');

      // add exising file content to new file content so it is not overwritten
      const buffer = Buffer.from(`${books}, ${fileContent}`);
      // write file specifying file, content, length of content, and position of where to write new conent
      fs.writeSync(file, buffer, 0, buffer.length, insertPosition);
      // alert user that their choices have been saved to reading list
      this.alertBooksSaved();
    });
  }

  alertBooksSaved() {
    if (this.booksFromSearch.length > 1) {
      console.log(`  These books have been saved to your reading list. To view your reading list, type 'books list'.
  ================================`);
    } else if (this.booksFromSearch.length === 1) {
      console.log(`  This book has been saved to your reading list. To view your reading list, type 'books list'.
  ================================`);
    } else {
      console.log('No books were saved to your reading list at this time.');
    }
  }

  static displayReadingList() {
    if (readingList.length > 0) {
      console.log(`  ================================
  Your Reading List:
  ================================`);
      for (let i = 0; i < readingList.length; i++) {
        readingList[i].map((book) => (console.log(`  Title: ${book.Title}
  Author(s): ${book.Authors}
  Publisher: ${book.Publisher}
  ================================`)
        ));
      }
    } else {
      console.log('Your reading list is currently empty.  To add books to your reading list, please search for a book.');
    }
    process.exit();
  }
}

module.exports = ReadingList;
