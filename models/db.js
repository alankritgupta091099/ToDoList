const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/ToDo',{useNewUrlParser:true},(err)=>{
    if(!err)
    console.log('MongoDb Connected');
    else
    console.log('Error',err);
});

require('./tasks');