
'use strict';

const color = require('colors');

function getFormatTime(){
	let date = new Date();
	return (date.getFullYear() + '-' + new String(date.getMonth()).padStart(2, '0') +
		'-' + new String(date.getDate()).padStart(2, '0') + ' ' + new String(date.getHours()).padStart(2, '0') +
		':' + new String(date.getMinutes()).padStart(2, '0') + ':' + new String(date.getSeconds()).padStart(2, '0') +
		'.' + date.getMilliseconds());
}

module.exports = {
	debug(...args) {
		console.log(color.green('[DEBUG]' + '[' + getFormatTime() + ']: '), ...args);
	},
	info(...args) {
		console.log(color.magenta('[INFO]') + '[' + getFormatTime() + ']:', ...args);
	},
	warn(...args) {
		console.error(color.yellow('[WARN]' + '[' + getFormatTime() + ']:'), ...args);
	},
	error(...args) {
		console.error(color.red('[ERROR]' + '[' + getFormatTime() + ']:'), ...args);
		console.trace();
	}
}
