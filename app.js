const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const exp_messages = require('express-messages');
const multer = require('multer');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
var path = require('path');
const ejs = require('ejs');

//our routes inclusion
var indexRouter = require("./routes/index");
var usersRouter = require('./routes/users');
//init the express server
var app = express();
//write some middlewares
var logger = (req, res, next) => {
    //console.log("Logger started");
    next()
};
//set  middlewares,should always come before the routes
//SET UP VIEW ENGINE, EJS FOR THIS CASE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger);
//BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//SET STATIC PATHS
app.use(express.static(path.join(__dirname, 'public')));
//SET UP IMAGE UPLOADS PATH
app.set(multer({ dest: './public/uploads' }).any('file'));
//init passport
app.use(passport.initialize());
app.use(passport.session());
//set flash
app.use(flash());
//flash messages
app.use((req, res, next) => {
    res.locals.messages = exp_messages(req, res);
    next();
});
//OUR GLOBAL VARS
app.use((req, res, next) => {
    res.locals.errors = null;
    res.locals.people = null;
    next(); //must be provide to provide the route url redirect
});
//SET Validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

//set a get for the indexroute
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //next(createError(404));

    res.render('404', { title: "Page Not Found", error:res.statusMessage })
});
//set the listening port for the sever,always at the bottom
app.listen(3000, () => {
    console.log("Magic happening on port 3000....")
});