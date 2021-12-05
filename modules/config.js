
'use strict';

const {resolve} = require('path'); const PATH = resolve('.');
const Conf = require('conf');

const VERSION = '1.0.1';

const config = new Conf({
    cwd: PATH,
    configName: 'config.json',
    fileExtension: '',
});

config.VERSION = VERSION;

module.exports = config;
