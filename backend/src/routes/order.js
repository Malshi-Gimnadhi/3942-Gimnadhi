const express =require('express');

const router =express.Router();
const OrderController =require('../controllers/order');

router.post('/',OrderController.create)
router.get('/seller/:id',OrderController.getOrderBySeller)
router.get('/buyer/:id', OrderController.getOrderByBuyer)

module.exports=router;