const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const OrdersController = require("../controllers/orders");

//Handle call router for Order
router.get("/", checkAuth, OrdersController.order_get_all);
router.post("/", checkAuth, OrdersController.orders_create_order);
router.get("/:orderId", checkAuth, OrdersController.orders_get_order);
router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);


//const secretKey = 'HieuJSC';
// //Handle incomming Get requests to /orders
// router.get('/', (req, res, next)=>{
//     // res.status(200).json({
//     //     message: 'Get Order was created'
//     // });
//      let {token} = req.cookies;
//      console.log('Token' +token)
//     if(!token){
//         res.redirect('/signin');
//     }
//     jwt.verify(token, secretKey, {}, (err, payload) => {
//         if (err) res.json({error: err.message})
//         res.send(`Welcome, <b> ${payload.username} </b>`)
//       })
// });

// router.post('/', (req, res, next)=>{
//     res.status(201).json({
//         message: 'Order was created'
//     });
// });

// router.get('/:orderId', (req,res,next)=>{
//     res.status(200).json({
//         message: 'Order details',
//         orderId: req.params.orderId
//     });
// });

module.exports = router