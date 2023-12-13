//importing mongoose
const mongoose=require('mongoose')

//making the schema
const pdfSchema=new mongoose.Schema({
    userId:{
        required:true,
        type:String
    },
    filename:{
        required:true,
        type:String
    },
    title:{
        required:true,
        type:String
    }
})

//converting this schema into model
const Pdf=mongoose.model("Pdf",pdfSchema)

//exporting this model
module.exports=Pdf