
//importing express
const express=require('express')

//taking router from express
const router=express.Router()

//importing the controller
const userController=require('../controllers/userController')
const pdfController= require('../controllers/pdfController')



//user register
router.post('/register',userController.registerUser)

//login 
router.post('/userlogin',userController.userLogin)

//getting the user details with respect to ID
router.get('/getdetails/:userId',userController.verify_token,userController.userDetails)

// to upload single pdf file
//here we pass the userId and title of pdf as params
router.post('/uploadpdf/:userId/:title',userController.verify_token,pdfController.upload.single("file"),pdfController.pdfData)

//to get all the data
router.get('/getpdf/:userId',userController.verify_token,pdfController.getAllPdf)

//to get the extracted data
router.post('/extract',userController.verify_token,pdfController.extractPdf)

//delete pdf files
router.get('/delete/:filename',userController.verify_token,pdfController.deletePdf)


//exporting router middleware
module.exports=router