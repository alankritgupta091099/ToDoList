const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');
const bcrypt=require('bcryptjs');

router.get('/',(req,res)=>{
    res.render("register",{
        title:"Register"
    });
});
router.post('/',(req,res)=>{
    const{name,email,password,password2}=req.body;
    
    //console.log(user);
    let errors=[];
    if(!name||!email||!password||!password2){
        errors.push({msg:"Please fill in all fileds"});
    }
    if(password!=password2){
        errors.push({msg:"Passwords do not match"});
    }
    if(password.length<6){
        errors.push({msg:"Password should be minimum 6 characters"});
    }
    if(errors.length>0){
        res.render("register",{
            errors,
            title:'register',
            name,
            email,
            password,
            password2
        });
    }
    //console.log(errors)
    else{
        User.findOne({email:email})
        .then(user=>{
            if(user){
                errors.push({msg:"Email already exists"});
                res.render("register",{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else{
                const newUser=new User({
                    name:name,
                    email:email,
                    password:password
                });
                console.log(newUser);
                //Hash Password
                bcrypt.genSalt(10,(err,salt)=>
                    bcrypt.hash(newUser.password, salt,(err,hash)=>{
                        if(err) throw err;
                        //Set Password to hashed
                        newUser.password=hash;
                        //Save User
                        newUser.save()
                        .then(user=>{
                            req.flash('success_msg','You are now registered and can log in');
                            res.redirect('/login');
                        })
                        .catch(err>console.log(err));
                    }))
            }
        })
    }
});
module.exports=router;