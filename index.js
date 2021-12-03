const file = require('./modules/file')
const {connectToServer} = require('./modules/socket')
const command = require('./modules/src/command')

async function main(){
    setTimeout(()=>{
        command.router(undefined,JSON.stringify({target:'update'}))
    },10000)
    connectToServer()
}

main()