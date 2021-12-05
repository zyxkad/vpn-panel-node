
'use strict';

const logger = require('./modules/logger');

(function(){

var use_nodejs = process.argv0.endsWith('node');
var IS_MAIN = false;

process.argv.slice(use_nodejs?2:1).forEach((val)=>{
	if(val.startsWith('-')){
		val = val.substring(1);
		if(val.startsWith('-')){
			val = val.substring(1);
			switch(val){
				case 'main':{
					IS_MAIN = true;
				}return;
			}
		}
	}
});

let {initConfig} = require('./modules/file');
initConfig();

if(IS_MAIN){
	let {connectToServer} = require('./modules/client');

	return (async function(){
		connectToServer();
	})();
}

var main_process;
function createMainProcess(restart_count){
	main_process = require('child_process');.spawn(process.argv0, [...process.argv.slice(1), '--main'], {
		stdio: ['ignore', 'inherit', 'inherit'],
		windowsHide: true
	});

	main_process.on('exit', (code)=>{
		if(code !== 0){
			logger.warn(`Main process ${main_process.pid} exit with a non zero code:`, code);
			if(restart_count >= 3){
				logger.error('Restart time was more than 3 times, exit now.');
				process.exit(code);
			}
			logger.warn('We will restart main process after 10sec.');
			setTimeout(createMainProcess, 10000, restart_count ++);
			return;
		}
		process.exit(0);
	});

	main_process.on('error', (err)=>{
		logger.error('Run main process error:', err);
		process.exit(1);
	})
}

createMainProcess(0);

})();
