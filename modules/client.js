
'use strict';

const logger = require('./logger');
const config = require('./config');
const SocketNode = require('socket-node');


async function msgHandler(socket, data, reply){
	switch(data.T){
		case 'addUser':{
			await file.addUserToList(data.username, data.password, data.ip);
		}break;
		case 'delUser':{
			await file.delUserFromList(data.username);
		}break;
		case 'getPSK':{
			const psk = await file.readPsk();
			reply({T: 'getPSK', preShareKey: psk});
		}break;
		case 'version':{
			reply({T: 'version', version: config.VERSION});
		}break;
	}
}

function connectToServer(){
	var serverurl = config.get('serverurl');
	if(serverurl[serverurl.length - 1] !== '/'){
		serverurl += '/';
	}
	serverurl += 'api/node/socket';
	logger.info(`正在尝试连接到服务器: ${serverurl}...`);

	const socket = new SocketNode(serverurl, {init: {username: config.get('username'), password: config.get('password')}});

	socket.on('ready', ()=>{
		logger.info(`连接成功`);
	});

	socket.on('message', (data, reply)=>{
		msgHandler(socket, data, reply);
	});

	socket.on('error', (error)=>{
		logger.info('通讯发生错误, 错误信息:', error.message);
		//TODO:关闭定时任务,关闭所有与服务器通讯的进程
	});

	socket.on('close', (err)=>{
		if(err){
			logger.info('服务器连接断开:', err);
			process.exit(1);
		}
		logger.info('连接已断开');
		process.exit(0);
	});
}

module.exports = {
	connectToServer
}
