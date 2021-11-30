const Conf = require('conf')
const config = new Conf({
    cwd: `${__dirname}/../`,
    configName: 'config.json',
    fileExtension: '',
})

module.exports = config