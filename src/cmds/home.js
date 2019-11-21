const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let searchWords = ''
module.exports = () => {
    rl.question('Welcome to Google Books API search CLI! What\'s your name?  ', (name) => {
        console.log(`Hi ${name}!`)
        rl.question('To search for your book, go ahead and type your first search.  ', (keywords) => {
            searchWords += keywords
            console.log(searchWords,'the searchWords typed in', typeof(searchWords), '<-typeof searchWords');
            rl.close();
        }) 
    })
}

    
