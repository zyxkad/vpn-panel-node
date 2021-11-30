const fs = require('fs')
const os = require('os')
const logger = require('./logger')
const config = require('./config')
const fileLine = require('nth-file')

const readPsk = async ()=>{
    let data
    let result =[]
    const regExp = new RegExp('"','g')
    try {
        data = fs.readFileSync(config.get('location.ipsec'),"ascii").replace(regExp,'')
    }catch (error) {
        logger.warn(`读取文件时出现了一个错误:${error.message}`)
        process.exit(1)
    }
    const lines = data.split('\n')
    for (let i = 0; i < lines.length-1; i++) {
        let keys = lines[i].split(' ')
        result.push({username:keys[0],protocol:keys[5],password:keys[2],key:keys[6]})
    }
    return ({total:result.length,list:result})
}

const updatePsk =async (psk) => {
    const keys = await readPsk()
    for (let i = 0; i < keys.total; i++) {
        if (keys.list[i].key === psk){
            logger.info(`更新PSK失败, PSK已是相同的值`)
            //todo:重新同步PSK信息
        }
    }
    fileLine.delete(config.get('location.ipsec'),0)
    const data = `%any  %any  : PSK "${psk}"`
    try{
        fs.appendFileSync(config.get('location.ipsec'),data)
    }catch (e){
        logger.warn(`写入文件时出现了一个错误:${e.message}`)
        process.exit(1)
    }
    logger.info(`更新PSK密钥成功,新的PSK密钥为:${psk}`)
}

const readUserList = async ()=>{
    let data
    let result = []
    const  regExp = new RegExp('"', 'g')
    try{
        data = fs.readFileSync(config.get('location.chap'),'ascii').replace(regExp,``)
    }catch (error){
        logger.warn(`读取文件时出现了一个错误:${error.message}`)
        process.exit(1)
    }
    const lines = data.split('\n')
    for (let i = 0; i < lines.length-1; i++) {
        let keys = lines[i].split(' ')
        result.push({username:keys[0],protocol:keys[1],password:keys[2],address:keys[3]})
    }
    return ({total:result.length,list:result})
}


const addUserToList = async (username,password,ip)=>{
    const users = await readUserList()
    for (let i = 0; i <users.total; i++) {
        if (users.list[i].username === username){
            logger.debug(`请求新增的用户名已存在于验证列表中,取消添加`)
            //执行到这里则代表本地用户列表并未与服务器用户列表进行同步,进行一次主动同步
            //TODO:重新同步用户列表到服务器
            return
        }
    }
    const data = `"${username}" l2tpd "${password}" ${ip} ${os.EOL}`
    try{
        fs.appendFileSync(config.get('location.chap'),data)
    }catch (e){
        logger.warn(`写入文件时出现了一个错误:${e.message}`)
        process.exit(1)
    }
    logger.info(`新增用户[${username}成功!]`)
}


const delUserFromList = async (username)=>{
    const users = await readUserList()
    for (let i = 0; i < users.total; i++) {
        if(users.list[i].username === username){
            fileLine.delete(config.get('location.chap'),i)
            logger.info(`已删除用户[${username}]的配置信息`)
            return
        }
    }
    //如果执行到这里则代表本地用户列表并未与服务器用户列表进行同步,进行一次主动同步
    logger.info(`未找到用户[${username}],删除用户子程序无法执行`)
    //TODO:重新同步用户列表到服务器
}


const initConfig = async ()=>{
    if (config.get('location')=== undefined){
        config.set('location.chap','Please set this to chap-secrets file')
        config.set('location.ipsec','Please set this to ipsec-secrets file')
        config.set('server.host','81.70.98.15')
        config.set('server.port',6100)
        logger.info(`已重新生成配置文件,请对配置文件进行更新后重启程序!`)
        process.exit(1)
    }
}

module.exports = {
    readUserList,
    addUserToList,
    delUserFromList,
    initConfig,
    readPsk,
    updatePsk
}