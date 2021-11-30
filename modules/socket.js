const client = require('net')
const config = require('./config').get('server')
const logger = require('./logger')
const { Stick, MaxBodyLen } = require('@lvgithub/stick/index');
const {router,sender} = require('./src/command')

function connectToServer (){
    const stick = new Stick(1024);
    stick.setMaxBodyLen(MaxBodyLen['32K']);
    logger.info(`正在尝试连接到服务器:${config.host}:${config.port}...`)

    const socket = client.connect(config.port,config.host)

    socket.on('connect',()=>{
        logger.info(`正在连接....`)
        const data = stick.makeData(JSON.stringify({target:'register'}))
        socket.write(data)
    })

    socket.on('data',(data)=>{
        stick.putData(data)
    })

    stick.onBody(async body=>{
        console.log(body.toString())
        await router(socket,body.toString())
    })

    //通过事件接收参数并进行发送
    sender.on('send',(data)=>{
        socket.write(stick.makeData(JSON.stringify(data)))
    })

    socket.on('error',(error)=>{
        logger.info(`通讯发生错误,错误信息:${error.message}`)
        //TODO:关闭定时任务,关闭所有与服务器通讯的进程
    })

    socket.on('close',(safe)=>{
        if (safe){
            logger.info(`到服务器的连接被关闭`)
            process.exit(1)
        }else{
            logger.info(`无法连接到服务器,连接强制关闭`)
            process.exit(1)
        }
    })
}

module.exports ={
    connectToServer
}