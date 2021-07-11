const app = require('./index')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path: './config.env'})

//mongo-DB
const DB = process.env.DATABASE
// console.log(DB)
mongoose.connect(DB, {
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true
}).then(con =>{ 
  // console.log(con.connections)
  console.log("DB CONNECTED!")
})

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
  