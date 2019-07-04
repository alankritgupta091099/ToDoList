require('./models/db');

const express=require('express');
const  app=express();
const exphbs=require('express-handlebars');
const path=require('path');
const bodyParser=require('body-parser');

const add=require('./add');
const list=require('./list');
const completed=require('./completed');
const deleteAll=require('./delete');
const login=require('./login');
const register=require('./register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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