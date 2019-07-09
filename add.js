const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Task=mongoose.model('Task');
const User=mongoose.model('User');
const{ensureAuthenticated}=require('./auth');

router.get('/',ensureAuthenticated,(req,res)=>{
    res.render("add",{
        title:'Add Task'
    });
});

router.post('/',(req,res)=>{
    //console.log(req.body);
    if(req.body._id==""){
        insertTask(req,res);
    }else{
        updateTask(req,res);
    }
    
})

function insertTask(req,res){
    var task=new Task();
    task.task=req.body.task;
    task.user=req.user.email;
    task.save((err,doc)=>{
        if(!err){
            res.redirect('/list');
        }
        else{
            console.log('Error occured: '+err);
        }
    });
}
function updateTask(req,res){
    //console.log(req.body);
    Task.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('/list');
        }
        else{
            console.log('Error during Update record'+err);
        }
    });
}
router.get('/:id',ensureAuthenticated,(req,res)=>{
    console.log(req.body);
    Task.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("add",{
                title:'Update Data',
                Task:doc
            });
        }
        else{
            console.log("Error",err);
        }
    });
});
module.exports=router;   