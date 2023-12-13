

//importing mongoose
const mongoose=require('mongoose')

//taking connection string from .env
const DB=process.env.DATABASE

//connecting mongoose with mongoDb
mongoose.connect(DB,{

    useUnifiedTopology:true,
    useNewUrlParser:true
    
}).then(()=>{
    console.log('Databse connected successfully')
}).catch((err)=>{
    console.log(err)
})