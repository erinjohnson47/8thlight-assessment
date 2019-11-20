# 8th Light Technical Assessment

For my 8th Light Technical Assessment, I am creating a command line application that accesses the [Google Books API](https://developers.google.com/books/docs/overview) to search for books and construct a reading list. 

### How to run this command line app
1. fork or clone the repository from [here](https://github.com/erinjohnson47/8thlight-assessment)
2. from the command line, cd into the repository you just forked/cloned and run `npm install` to install dependencies
3. touch `config.js` and add
`const config = {
    GOOGLE_BOOKS_API_KEY: ''}`, you should then insert your Google Books API key as a string (within the empty single quotes)
3. to run the application from the command line, type `.bin/outside`


### User Stories:
1. A user should be able to type in a query (author, title, or pub) and receive back a list of **5 books matching that query**.

2. Each item in the list should include: 
    - author 
    - title
    - publishing company

3. A user should be able to select a book from the five displayed to save to a “Reading List”

4. View a “Reading List” with all the books the user has selected from their queries (local reading list and not tied to Google Books account features).

### Technologies (to be updated):
CLI | Javacsript | Node.js 