const color = require('colors')
const {sender} = require('./src/command')

module.exports = {
    debug(message) {
        console.log('[' + color.bold(color.red('DEBUG')) + ']' + color.yellow(message));
    },
    info(message) {
        console.log('[' + color.red(new Date().toLocaleTimeString()) + ']' + color.magenta(message));
    },
    warn(message) {
        sender.emit('send',{target:'message',message:message})
        console.log('[' + color.red(new Date().toLocaleTimeString()) + ']' + color.red(message));
    }
}
