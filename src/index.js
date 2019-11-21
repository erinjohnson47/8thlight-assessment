const minimist = require('minimist');
const help = require('./cmds/help')
const version = require('./cmds/version')
const search = require('./cmds/search')
const list = require('./cmds/list')
const error = require('./utils/error')
const home = require('./cmds/home')

module.exports = () => {

    const args = minimist(process.argv.slice(2))

    //if no args specified default to help menu
    let command = args._[0] || 'home';

    //command for version of books
    if (args.version || args.v) {
        command = 'version'
    }

    //command for help menu
    if (args.help || args.h) {
        command = 'help'
    }

    switch (command) {
        case 'home':
            home(args)
            break;

        case 'search':
            search(args)
            break;

        case 'version':
            version(args)
            break;

        case 'help':
            help(args)
            break;

        case 'list':
            list(args)
            break;

        default:
            error(`Sorry, "${command}" is not a valid command! You can type 'books help' or '--h' for a list of valid commands.`)
            break;
    }
}
