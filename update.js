const config = require('./modules/config').get('server')
const logger = require('./modules/logger')
const client = require('net')

function main (){
    logger.info(`Trying to connect to server...`)
    const socket = client.connect(config.port,config.host)
    socket.on('connect',()=>{
        logger.info(`Sending broadcast packet`)
        const data = stick.makeData(JSON.stringify({target:'broadcast',info:{target:'addUser',username:'aas2',password:'123',ip:'*'}}))
        socket.write(data)
    })

    socket.on('data',(data)=>{
        stick.putData(data)
    })

    stick.onBody(async body=>{
        console.log(body.toString())
        sendItProcess(body.toString())
    })


    socket.on('error',(error)=>{
        logger.warn(`客户端出现了一个错误:${error.message}`)
    })
}

function sendItProcess(body) {
    let message
    try{
        message = JSON.parse(body)
    }catch (e){
        logger.warn(`There is an error occurred when parsing message`)
        process.exit(1)
    }
}

main()