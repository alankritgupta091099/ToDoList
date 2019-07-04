const express=require('express');
const router=express.Router();
const  mongoose=require('mongoose');
const Task=mongoose.model('Task');

router.get('/',(req,res)=>{
    Task.find({completed:false},(err,doc)=>{
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
router.get('/:id',(req,res)=>{
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