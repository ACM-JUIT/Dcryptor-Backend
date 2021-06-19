const app = require('./index')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, ()=>{
    console.log(`Server Started on PORT ${PORT}`)
})

process.on('unhandledRejection', err =>{
    console.log(`${err.name}, ${err.message}`)
    server.close( ()=> {
      process.exit(1);
    })
})
  