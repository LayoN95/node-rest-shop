const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

var path = require('path');
var hbs = require('express-handlebars');

const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://marcin:' +
process.env.MONGO_ATLAS_PW +
'@nodejs-jamoh.mongodb.net/test?retryWrites=true&w=majority',
{
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allowed-Origin', '*');
  res.header('Access-Control-Allowed-Headers',
   'Origin, X-Request-With, Content-Type, Accept, Authorization'
 );
 if (req.method === 'OPTIONS') {
   res.header('Access-Contol-Allowed-Methods', 'PUT, POST, PATCH, DELETE, GET');
   return res.status(200).json({});
 }
 next();
});

//Routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) =>{
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
