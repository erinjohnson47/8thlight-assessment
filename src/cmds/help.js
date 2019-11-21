const menus = {
    main: `
        books [command] <options>
        
        search ............ search google books
        list .............. show reading list
        version ........... show package version
        help .............. show help menu for a command`,

    search: `
        books search <options>
        
        --keywords, -k .... your book search terms, for multiple keywords, enter the words+separated+like+this+without+spaces or enter as a "string within quotes"`,
    
    list: `
        books list <options>
        
        --save, -s ........ save to your reading list
        --list, -l ........ view the list of books you've saved to your bookshelf/reading list
        --keywords, -k .... your list search terms, for multiple keywords, enter the words+separated+like+this+without+spaces or enter as a "string within quotes"`

}

module.exports = (args) => {
    //if args 0 is help, args 1 is the subcommand and should return menus.subCommand, else subcommand is args 0
    const subCommand = args._[0] === 'help'
        ? args._[1]
        : args._[0]
    console.log(menus[subCommand] || menus.main)
}