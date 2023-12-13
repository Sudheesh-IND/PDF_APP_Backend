
//importing multer
const multer = require('multer')

//importing pdf schema
const Pdf = require('../model/pdfSchema')

//global variable to hold the filename
let filename = ""

const PDFMerger = require('pdf-merger-js');
const fs=require('fs')


//setting up disk storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {


    console.log(file.title)
    //destination for storing files
    cb(null, './pdffiles')
  },
  filename: function (req, file, cb) {
    //unique filename
    const uniqueSuffix = Date.now()
    //combiling the orginal filename and unique suffix

    //getting the filename to the global variable
    filename = uniqueSuffix + file.originalname
    cb(null, filename)
  }

}
)

//function to acll the storage
exports.upload = multer({ storage: storage })

//storing pdf data into the mongoDB
exports.pdfData = async (req, res) => {
  //inside try catch block
  console.log('inside upload api call')
  try {

    //taking the userId from params
    const { userId, title } = req.params

    ///making the data into a body
    const body = { userId, filename, title }

    const response = await Pdf.insertMany(body)

    res.status(200).json(response)

  } catch (error) {
    res.status(400).json(error)
  }
}

//get all pdf details
exports.getAllPdf = async (req, res) => {
  //inside try catch block
  try {
     
    //getting the user id fromapi link
    const {userId}=req.params
    //getting all the details
    const response = await Pdf.find({userId})
    //sending the response back
    res.status(200).json(response)

  } catch (error) {
    res.status(400).json(error)
  }
}


//extraacting pdf pages
exports.extractPdf = async (req, res) => {
  //inside try catch block
  try {

    //destructuring the request
    const { filename, pdfPages } = req.body
    //creating a new merger instance
    var merger = new PDFMerger();
    //giving the path and the pages to be merged
    await merger.add(`./pdffiles/${filename}`,pdfPages)
    //giving an unique name for the merged pdf
    const newName=Date.now()+filename
    //saving it as a buffer for sending it to the frontend
    const mergedPdfBuffer = await merger.saveAsBuffer(newName); 
    //response send back to frontend
    res.status(200).json(mergedPdfBuffer)

  } catch (error) {
     res.status(400).json(error)
  }
}


//delete pdf
exports.deletePdf=async(req,res)=>{
   //insode try catch
   try {

    const {filename}=req.params
    
    //path to pdf file
    var file=`./pdffiles/${filename}`
    //deleting file from server
    fs.unlinkSync(file)
    //deleting file from mongoDB
     const response=await Pdf.deleteOne({filename})

     if(response){
       res.status(200).json(response)
     }
    
   } catch (error) {
     res.status(400).json(error)
   }
}