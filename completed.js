const express=require('express');
const router=express.Router();
const  mongoose=require('mongoose');
const Task=mongoose.model('Task');
const{ensureAuthenticated}=require('./auth');

router.get('/',ensureAuthenticated,(req,res)=>{
    Task.find({completed:true,user:req.user.email},(err,doc)=>{
        if(!err){
            res.render("completed",{
                title:'Completed Tasks',
                list:doc
            });
        }
        else{
            console.log('Error',err);
        }
    });
});
router.get('/:id',ensureAuthenticated,(req,res)=>{
    //req.body.completed=true;
    //console.log(req.params.id)
    Task.findOneAndUpdate({_id:req.params.id},{completed:true},{new:true},(err,doc)=>{
        if(!err){
            res.redirect('/completed');
        }
        else{
            console.log('Error during Update record'+err);
        }
    });
});
module.exports=router;