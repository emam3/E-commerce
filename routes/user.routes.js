const router = require('express').Router()
const userController = require('../controllers/userController')
const adminAuth = require('../middlewares/admin.auth.middleware')
const sellerAuth = require('../middlewares/seller.auth.middleware')
const userAuth = require('../middlewares/user.auth.middleware')

router.post("/register" , userController.register)
router.post("/login" , userController.login)
router.post("/deleteUser" , adminAuth , userController.deleteUserController) //for admin only
router.post("/logout" , userAuth , userController.logout)
router.post("/addTocard" , userAuth , userController.addToCard)


module.exports = router