let readingList = [[{"Title":"Goodnight moon","Authors":"Margaret Wise Brown","Publisher":"none listed"},{"Title":"Goodnight Moon Classic Library","Authors":"Margaret Wise Brown","Publisher":"HarperCollins"}],];

module.exports = () => {
    console.log(`Your Reading List:
    Title: ${readingList[0][0].Title}
    Authors: ${readingList[0][0].Authors}
    Publisher: ${readingList[0][0].Publisher}`)
    console.log()
    console.log()
    process.exit()
}