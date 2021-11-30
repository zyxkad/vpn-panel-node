const file = require('./modules/file')
const {connectToServer} = require('./modules/socket')

async function main(){
    connectToServer()
}

main()