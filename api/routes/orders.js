const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'HieuJSC';

//Handle incomming Get requests to /orders
router.get('/', (req, res, next)=>{
    // res.status(200).json({
    //     message: 'Get Order was created'
    // });
     let {token} = req.cookies;
     console.log('Token' +token)
    if(!token){
        res.redirect('/signin');
    }
    // jwt.verify(token, secretKey, {}, (err, result)=>{
    //     if(err){    
    //         console.log(err)        
    //         res.json({error: err.message});
    //     }        
    //     //res.send(`This is Order page </br>Webcome, <b>${res.username}</b>`);
    // });
    jwt.verify(token, secretKey, {}, (err, payload) => {
        if (err) res.json({error: err.message})
        res.send(`Welcome, <b> ${payload.username} </b>`)
      })
});

router.post('/', (req, res, next)=>{
    res.status(201).json({
        message: 'Order was created'
    });
});

router.get('/:orderId', (req,res,next)=>{
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

module.exports = router