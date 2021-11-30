const file = require('./modules/file')
const {connectToServer} = require('./modules/socket')

async function main(){
    await file.initConfig()
    await file.readPsk()
    await file.updatePsk('li990114')
    connectToServer()
}

main()