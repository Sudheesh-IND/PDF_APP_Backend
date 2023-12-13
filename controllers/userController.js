
//importing the user model
const User=require('../model/userSchema')

//importing bcrypt
const bcrypt=require('bcrypt')

//importing jwt
const jwt=require('jsonwebtoken')

//logics for entering the data into db

exports.registerUser=async(req,res)=>{
 console.log('inside reg api call')
    //writing it in try catch block
    //try catch block helps in error handling
    try {
       
        //destructuring the 
        const {name,email,password}=req.body

        //bycrypting the password
        const hashedPass= await bcrypt.hash(password,10)
    
        //taking theses variables into a body
        const body={
            name,email,password:hashedPass
        }

        //checking if user present or not
        const isUserPresent=await User.findOne({email})
        
        if(isUserPresent!==null){
            //response if user is present
            res.status(400).json('User already presnt')
        }else{
            //if user not presnt
            const response=await User.insertMany(body)
            //response after inserting
            if(response){
                res.status(200).json(response)
            }
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//logic for login
exports.userLogin=async(req,res)=>{
    //inside try catch block
    try {
        
        //destructuring
        const {email,password}=req.body

        //finding the user
        const response=await User.findOne({email})
        if(response){
            //checking if both the password are same
            const isPassSame=await bcrypt.compare(password,response.password)
            //if same
            if(isPassSame){
                //generating token
                const token=jwt.sign({key:response.email},process.env.SECRET_KEY)
              
                const data={response,token}
                res.status(200).json(data)
            }else{
                res.status(400).json('Password is incorrect')
            }

        }else{
            //if there is no response
            res.status(400).json('User not present')
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get details using the mongoDB ID

exports.verify_token=(req,res,next)=>{
    //inside try catch block
    try {
         
        //taking the token from headers
        const token_from_frontend=req.headers['authorization']
       
        if(!token_from_frontend){
            res.status(400).json('Please Login')
        }else{
             
            //verifying the token
            jwt.verify(token_from_frontend,process.env.SECRET_KEY)
        
            next()
          
        }
        
    } catch (error) {
        res.status(400).json("Please login")
    }
}

exports.userDetails=async(req,res)=>{
    //inside try catch block
    try {

        //destructuring to get ID from the api link
        const {userId}=req.params

        //getting the details
        const response=await User.findOne({_id:userId})
          
        //sending the response back to the server
        res.status(200).json(response)
        
    } catch (error) {
        //if error occurs
        res.status(400).json(error)
    }
}