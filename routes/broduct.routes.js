const router = require('express').Router()
const broductController = require('../controllers/broductController')
const adminAuth = require('../middlewares/admin.auth.middleware')
const sellerAuth = require('../middlewares/seller.auth.middleware')

router.post("/addBroduct" , sellerAuth , broductController.addBroduct)
router.post("/deleteBroduct" , sellerAuth , broductController.deleteBroductModel)


module.exports = router