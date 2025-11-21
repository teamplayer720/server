var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carRouter = require('./routes/car');
var artifactsRouter = require('./routes/artifacts'); 
var gridRouter = require('./routes/grid'); 
var resourceRouter = require('./routes/resource');

var car = require("./models/car");
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();
const connectionString = process.env.MONGO_CON;
const mongoose = require('mongoose');
mongoose.connect(connectionString);//, { useNewUrlParser: true, useUnifiedTopology: true });


var db = mongoose.connection;
var car = require("./models/car");




db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connection to MongoDB succeeded');
}); 

async function recreateDB(){
// Delete everything
  await car.deleteMany();
  let instance1 = new
  car({make:"toyota", model:"camry", cost:"15000"});
  instance1.save().then(doc=>{console.log("First object saved")}).catch(err=>{
    console.error(err)
  }); 

  let instance2 = new
  car({make:"mercedes", model:'e440', cost:'90000'});
  instance2.save().then(doc=>{
  console.log("Second object saved")}
  ).catch(err=>{
  console.error(err)
  }); 

  let instance3 = new
  car({make:"ferrari", model:'sf350', cost:'300000'});
  instance3.save().then(doc=>{
  console.log("Third object saved")}
  ).catch(err=>{
  console.error(err)
  });
}


let reseed = true;
if (reseed) {
  recreateDB();
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user){
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err){
        return done(err)
    })
  })
)



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/car',carRouter);
app.use('/artifacts', artifactsRouter);
app.use('/grid', gridRouter);
app.use('/resource', resourceRouter);


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
