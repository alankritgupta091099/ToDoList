const express=require('express');
const router=express.Router();
const  mongoose=require('mongoose');
const Task=mongoose.model('Task');
const{ensureAuthenticated}=require('./auth');

router.get('/',ensureAuthenticated,(req,res)=>{
    Task.find({completed:false,user:req.user.email},(err,doc)=>{
        if(!err){
            res.render("list",{
                title:'List Of Tasks',
                list:doc
            });
        }
        else{
            console.log('Error',err);
        }
    });
});
router.get('/:id',ensureAuthenticated,(req,res)=>{
    //console.log(req.body);
    Task.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/list');
        }
        else{
            console.log("Error :"+err);
        }
    });
});
module.exports=router;  