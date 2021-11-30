const color = require('colors')


const info = (message) => {
    console.log('[' + color.red(new Date().toLocaleTimeString()) + ']' + color.magenta(message));
}

const warn = (message) => {
    console.log('[' + color.red(new Date().toLocaleTimeString()) + ']' + color.red(message));
}

const debug = (message) => {
    console.log('[' + color.bold(color.red('DEBUG')) + ']' + color.yellow(message));
}

module.exports = {
    info,
    debug,
    warn
}
