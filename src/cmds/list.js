const readingList = [];

const loopThroughReadingListArray = () => {
  for (let i = 0; i < readingList.length; i++) {
    readingList[i].map((book) => (console.log(`  ================================
  Title: ${book.Title}
  Author(s): ${book.Authors}
  Publisher: ${book.Publisher}`)
    ));
  }
};

module.exports = () => {
  console.log(`  ================================
  Your Reading List:`);
  loopThroughReadingListArray();
  console.log('  ================================');
  process.exit();
};
