
//importing mongoose
const mongoose=require('mongoose')

//making the schema for users
const userSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
  
})


//mmaking the schema into a model
const User=mongoose.model('User',userSchema)

//exporting the model
module.exports=User
