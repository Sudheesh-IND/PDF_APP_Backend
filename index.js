
//configuring dotenv
require('dotenv').config()

//importing express
const express=require('express')

//importing cors
const cors=require('cors')

//inporting connection file
require('./connection')

//importing route
const router=require('./routes/router')


//mmaking server
const server=express()

//for converting data into json format
server.use(express.json())

//using cors
server.use(cors())


//using router
server.use(router)

//making the pdffiles folder statis to access data
server.use("/pdffiles",express.static("pdffiles"))

//definging the port value
const PORT=5000

//making the server
server.listen(PORT,()=>{
    console.log('Server connected')
})