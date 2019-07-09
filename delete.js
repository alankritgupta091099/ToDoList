const express=require('express');
const router=express.Router();
const  mongoose=require('mongoose');
const Task=mongoose.model('Task');
const{ensureAuthenticated}=require('./auth');

router.get('/',ensureAuthenticated,(req,res)=>{
    //res.json({message:"completed"});
    //console.log('Delete all initiated');
    Task.deleteMany({completed:true},{new:true},(err,doc)=>{
        if(!err){
            res.redirect('/completed');
        }
        else{
            console.log('Error during Delete All'+err);
        }
    });
});

module.exports=router;