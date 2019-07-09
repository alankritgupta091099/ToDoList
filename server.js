require('./models/db');

const express=require('express');
const  app=express();
const exphbs=require('express-handlebars');
const path=require('path');
const bodyParser=require('body-parser');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');

const add=require('./add');
const list=require('./list');
const completed=require('./completed');
const deleteAll=require('./delete');
const login=require('./login');
const register=require('./register');

//Passport Config
 require('./passport')(passport);

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})

//template engine
app.set('views',path.join(__dirname,'/views/'));
app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));
app.set('view engine','handlebars');



app.listen(8080,()=>{
    console.log('listening at port',8080);
});
app.use('/add',add);
app.use('/list',list);
app.use('/completed',completed);
app.use('/delete',deleteAll);
app.use('/login',login);
app.use('/register',register);