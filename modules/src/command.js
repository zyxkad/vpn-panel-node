const {exec} = require('child_process')
const path = require('path')
const config = require('../config')
const file = require('../file')
const events = require('events');
const sender = new events.EventEmitter()
const logger = require('../logger')

const router = async (socket,data)=>{
    let message
    try {
        message = JSON.parse(data)
    }catch (e){
        logger.warn(`处理Json数据时发生错误:${e.message}`)
    }
    switch (message.target){
        case 'update':
            await updateClient()
        break

        case 'reboot':
            await rebootClient()
        break

        case 'addUser':
            await file.addUserToList(message.username,message.password,message.ip)
        break

        case 'delUser':
            await file.delUserFromList(message.username)
        break

        case 'getPSK':
            await getPSK()
        break

        case 'getVersion':
            await getVersion()
        break
    }
}

const getVersion = async () => {
    sender.emit('send',{target:'version',version:config.get('client.version')})
}

const getPSK = async () => {
    const psk = await file.readPsk()
    sender.emit('send',{target:'getPSK',preShareKey:psk})
}


const rebootClient = async () => {
    exec('sudo reboot',(error, stdout, stderr)=>{
        if (error){
            logger.warn(`自重启时出现了一个错误:\n${stderr}`)
            sender.emit('send',{target:'message',info:`自重启时出现了一个错误${stderr}`})
            process.exit()
        }
    })
}


const updateClient = async () => {
    logger.info(path.resolve('./'))
    exec(`cd ${config.get('location.program')}&&git pull`,(error, stdout, stderr)=>{
        if (error){
            logger.warn(`自更新时出现了一个错误:${stderr}`)
            sender.emit('send',{target:'message',info:`自更新时出现了一个错误${stderr}`})
            process.exit()
        }
        logger.info(`执行自动更新成功:\n${stdout}`)
    })
}

module.exports = {
    router,
    sender
}