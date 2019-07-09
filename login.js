const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

const User=require('./models/users');

router.get('/',(req,res)=>{
    res.render("login",{
        title:"Login"
    });
});
//Login Handle
router.post('/',(req,res,next)=>{
    //console.log("login me swagat hjai");
    passport.authenticate('local',{
        successRedirect:'/add',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
    // const{email,password}=req.body;
    // if(!passport.authenticate){
    //     console.log("login me swagat hjai");
    //     // res.render("login",{
    //     //     title:"login",
    //     //     email,
    //     //     password
    //     // });
    // }
});
//Logout Handle
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg','You Are Logged Out');
    res.redirect('/login');
});

//alankritgupta007@gmail.com
//asg-123
module.exports=router;