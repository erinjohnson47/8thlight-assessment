const minimist = require('minimist');
const config = require('../config')
// const getBooksRequest = require('./api')
const help = require('./cmds/help')
const version = require('./cmds/version')
const search = require('./cmds/search')

module.exports = () => {
    console.log("Welcome to your bookshelf!")
    const args = minimist(process.argv.slice(2))

    //if no args specified default to help menu
    let command = args._[0] || 'help';

    //command for version of books
    if (args.version || args.v) {
        command = 'version'
    }

    //command for help menu
    if (args.help || args.h) {
        command = 'help'
    }

    switch (command) {
        case 'search':
            search(args)

        case 'version':
            version(args)
            break;

        case 'help':
            help(args)
            break;

        default:
            console.error(`Sorry, "${command}" is not a valid command! You can type 'help' or '--h' for a list of valid commands.`)
            break;
    }
}
