require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL

function  connectionMongoDB(){
    mongoose.connect(MONGODB_URL)

    mongoose.connection.on('connected', () =>{
        console.log('connection to mongodb successful')
    })

    mongoose.connection.on('err', (err) =>{
        console.log(err)
        
    })

}

module.exports =   {connectionMongoDB}