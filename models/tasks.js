const mongoose=require('mongoose');

var taskSchema=new mongoose.Schema({
    task:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    completed:{
        type:Boolean,
        default:false
    },
    user:{
        type:String,
    }
});

mongoose.model('Task',taskSchema);