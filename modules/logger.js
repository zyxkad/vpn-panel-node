const color = require('colors')

module.exports = {
    debug(message) {
        console.log('[' + color.bold(color.red('DEBUG')) + ']' + color.yellow(message));
    },
    info(message) {
        console.log('[' + color.red(new Date().toLocaleTimeString()) + ']' + color.magenta(message));
    },
    warn(message) {
        console.log('[' + color.red(new Date().toLocaleTimeString()) + ']' + color.red(message));
    }
}
