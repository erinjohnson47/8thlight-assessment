let readingList = [];

module.exports = () => {
    console.log(`Your Reading List:`)
    const loopThroughReadingListArray = () => {
        for (let i = 0; i < readingList.length; i++) {
            readingList[i].map(book => {
                console.log(`
    Title: ${book.Title}
    Author(s): ${book.Authors}
    Publisher: ${book.Publisher}`)
            })
        }
    }
    loopThroughReadingListArray();
    process.exit()
}