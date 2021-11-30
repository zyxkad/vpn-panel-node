const config = require('./modules/config').get('server')
const logger = require('./modules/logger')
const client = require('net')
const { Stick, MaxBodyLen } = require('@lvgithub/stick/index');

function main (){
    logger.info(`Trying to connect to server...`)
    const stick = new Stick(1024);
    stick.setMaxBodyLen(MaxBodyLen['32K']);
    const socket = client.connect(config.port,config.host)
    socket.on('connect',()=>{
        logger.info(`Sending broadcast packet`)
        const data = stick.makeData(JSON.stringify({target:'broadcast',info:{target:'update'}}))
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