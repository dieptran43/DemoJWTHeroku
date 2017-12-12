const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

const log = console.log;

app.use(morgan('dev')); //morgan to know url in server
app.use('/', express.static('./public'));
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//s1 router
const signinRoutes = require('./api/routes/signin');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.get('/', (req, res, next)=>{
    log('Vao day 1')
    res.status(200).render('index');
});

app.use('/signin', signinRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// app.use((req, res, next) =>{
//     let err = new Error('Not found page.');
//     err.status = 404;
//     next(err);
// });

// app.use((err, req, res, next)=>{
//     res.status(err.status || 500);
//     res.json({
//         error:{
//             message: err.message
//         }
//     });
// });
//e1 router

module.exports = app;