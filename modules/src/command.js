const {exec} = require('child_process')
const logger = require('../logger')
const path = require('path')
const config = require('../config')


const router = async (message)=>{
    switch (message.order){
        case 'update':
            await updateClient()
        break

        case 'reboot':
            exec('reboot',(error, stdout, stderr)=>{
                if (error){
                    logger.warn(`自更新时出现了一个错误:\n${stderr}`)
                    process.exit()
                }
            })
        break
    }
}



const updateClient = async () => {
    logger.info(path.resolve('./'))
    exec(`cd ${config.get('location.program')} &&git pull`,(error, stdout, stderr)=>{
        if (error){
            logger.warn(`自更新时出现了一个错误:${stderr}`)
            process.exit()
        }
        logger.info(`执行自动更新成功:\n${stdout}`)
    })
}

module.exports = {
    router
}