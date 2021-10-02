const { timeStamp } = require('console')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
var io = require('socket.io')(server)
const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://Akash:12345@cluster0.oogou.mongodb.net/sensor?retryWrites=true&w=majority'
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(dbURI,options).then(
    ()=>{
        console.log("Database Connected")
    }
)

const sensorSchema = new mongoose.Schema({},{strict: false})

var SensorData = mongoose.model('sensordata',sensorSchema)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection',function(client){
    console.log('client connected')
    client.on('join',(data)=>{
        setInterval(async ()=>{
            const getData = await SensorData.find().limit(20).sort({timeStamp:-1})
            client.broadcast.emit('message',getData)
        },5000)
    })
})

server.listen(3000,()=>{ console.log('server started')})