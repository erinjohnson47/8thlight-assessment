const menus = {
    main: `
        books [command] <options>
        
        search ............ search google books
        version ........... show package version
        help .............. show help menu for a command`,

    search: `
        books search <options>
        
        --keywords, -k .... your book search terms, please put multi-word keywords within "quotes"`,
    
    list: `
        books list <options>
        
        --list, -l ........ view the list of books you've saved to your bookshelf/reading list
        --keywords, -k .... your list search terms, please put multi-word keywords within "quotes"`

}

module.exports = (args) => {
    const subCommand = args._[0] === 'help'
        ? args._[1]
        : args._[0]
    console.log(menus[subCommand] || menus.main)
}