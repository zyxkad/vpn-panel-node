const {exec} = require('child_process')
const logger = require('../logger')


const router = async (message)=>{
    switch (message.order){
        case 'update':
            await updateClient()
            console.log('update')
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
    exec('git pull',(error, stdout, stderr)=>{
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