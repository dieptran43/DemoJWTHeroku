const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'HieuJSC';
const user = { username: 'user', password: 'password' };

router.get('/', (req, res, next) => {
    res.status(200).render('index');
});

router.post('/', (req, res, next) => {
    let { usr, pwd } = req.body;
    if (user.username == usr && user.password == pwd) {
        jwt.sign({ username: usr }, secretKey, {}, (err, token) => {
            if (err) {
                log("111111_" + err)
                res.json({ error: err.message });
            }
            res.cookie('token', token, { maxAge: 1000 * 60 * 3 }); //mean 3 minute
            res.redirect('/orders');

        })
    } else {
        res.redirect('/signin');
    }
});

module.exports = router;