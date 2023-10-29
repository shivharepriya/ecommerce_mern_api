const {authRole, CheckUserAuth} = require ('../Middleware/Auth.js')
const express = require('express')
const UserController = require('../Controllers/UserController')
const ProductController = require('../Controllers/ProductController.js')
const OrderController = require('../Controllers/OrderController.js')
const router = express.Router()

//userContoller api router
router.post('/register', UserController.registerUser)
router.post('/userlogin', UserController.loginUser)
router.post('/updatepassword/:id',CheckUserAuth, UserController.updatePassword)
router.post('/updateprofile/:id',CheckUserAuth, UserController.updateProfile)
router.get('/view/:id',UserController.View)
router.get('/logoutuser/:id', UserController.logoutUser)


// admin api 
router.get('/getalluser', UserController.getAllUser)
router.get('/getsingleuser/:id', UserController.getSingleUser)
router.get('/deleteuser/:id',UserController.deleteUser) //delete api pending work also check 
// i have to given id in single user and all user

// productContoller api
router.post('/product/createproduct',ProductController.createProduct)
router.get('/product/getallproduct', ProductController.getAllProducts)
router.get('/product/productdetail/:id', ProductController.getProductDetail)
router.post('/product/updateproduct/:id', ProductController.updateProduct)
router.get('/product/deleteproduct/:id', ProductController.deleteProduct)


// OderContoller api
router.post('/order/createorder', OrderController.newOrder)
router.get('/order/getallorder', OrderController.getAllOrder)
router.get('/order/getsingleorder/:id', OrderController.getSingleOrder)
router.get('/order/deleteorder/:id', OrderController.deleteOrder)


module.exports = router