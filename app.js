const express = require('express');

const app = express();
const morgan = require('morgan');
const productroutes = require('./api/routes/products');
const ordersroutes = require('./api/routes/orders');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');

mongoose.connect(
    'mongodb+srv://node-res-Limpag:' + process.env.MONGO_ATLAS_PW +
    '@node-res-jtl.qqqyzyd.mongodb.net/<your-database-name>?retryWrites=true&w=majority&appName=node-res-JTL',

    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/upload', express.static('upload'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH , DELETE, GET');
        return res.status(200).json({});
    }
    next();

});
//Routes which should handle request
app.use('/products', productroutes);
app.use('/orders', ordersroutes);
app.use('/user', userRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status|| 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;