require('dotenv').config();
const mongoose = require('mongoose');


const connectionString = process.env.MONGO_CON;


mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


var db = mongoose.connection;
var Costume = require("./models/car");




db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connection to MongoDB succeeded');
});


async function recreateDB(){
// Delete everything
await car.deleteMany();
let instance1 = new
car({car_make:"toyota", model:'camry',
cost:15000});
instance1.save().then(doc=>{
console.log("First object saved")}
).catch(err=>{
console.error(err)
});
}

let reseed = true;
if (reseed) {recreateDB();}


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artifactsRouter = require('./routes/artifacts'); 
var gridRouter = require('./routes/grid'); 
var resourceRouter = require('./routes/resource');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artifacts', artifactsRouter);
app.use('/grid', gridRouter);
app.use('/resource',resourceRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
