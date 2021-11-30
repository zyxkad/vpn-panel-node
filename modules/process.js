const logger = require('./logger')


const router = async (data) => {
    let message
    try{
        message = JSON.parse(data)
    }catch (e){
        logger.warn(`收到错误的Json消息:${data}`)
    }

    switch (message.target) {
        case 'register':
            logger.info(`正在注册到服务器...`)
        break

        case 'command':
            logger.info(`操作指令`)
        break
    }
}


module.exports= {
    router
}