const { version } = require('../../package.json')

module.exports = () => {
    console.log(`v${version}`)
    process.exit();
}