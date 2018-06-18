const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const log = console.log;

const mongoose = require('mongoose');
//Version3.6
mongoose.connect(
    "mongodb+srv://user_rest_shop:AAAAbbbbccc" +
    "@node-rest-shop-ricsq.mongodb.net/test?retryWrites=true"
);

//Version 3.4
//mongodb://user_rest_shop:<PASSWORD>@node-rest-shop-shard-00-00-ricsq.mongodb.net:27017,node-rest-shop-shard-00-01-ricsq.mongodb.net:27017,node-rest-shop-shard-00-02-ricsq.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true
// mongoose.connect(
//     "mongodb://user_rest_shop:" +
//     process.env.MONGO_ATLAS_PW +
//     "@node-rest-shop-shard-00-00-ricsq.mongodb.net:27017,node-rest-shop-shard-00-01-ricsq.mongodb.net:27017,node-rest-shop-shard-00-02-ricsq.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true"
// );
mongoose.Promise = global.Promise;

//s1 router
const signinRoutes = require('./api/routes/signin');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

app.use(morgan('dev')); //morgan to know url in server
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.get('/', (req, res, next) => {
    log('Vao day 1')
    res.status(200).render('index');
});

app.use('/signin', signinRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes)


app.use((req, res, next) => {
    let err = new Error('Not found page.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});
//e1 router

module.exports = app;