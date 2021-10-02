const express = require('express')
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

setInterval(addData,5000)

async function addData() {
    sensorData = new SensorData({
        temperature: Math.floor(Math.random()*40)+20,
        batteryLevel: Math.floor(Math.random()*100)+1,
        timeStamp: new Date().toLocaleString()
    })
    const data=await sensorData.save()
    console.log(data)
}