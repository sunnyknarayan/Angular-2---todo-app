var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://kalyanikomaragiri:Saibaba58.@ds143342.mlab.com:43342/mytasklist_kalyani',['tasks']);

//get all tasks
router.get('/tasks', function(req,res,next){
   db.tasks.find(function(err, tasks){
     if(err){
         res.send(err);
     }
     else
     {
         res.json(tasks);
     }
   });
});

//get single tasks
router.get('/task/:id', function(req,res,next){
   db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
     if(err){
         res.send(err);
     }
     else
     {
         res.json(task);
     }
   });
});

// saving new tasks
router.post('/task', function(req, res, next){
  var task = req.body;
  if(!task.title || !(task.isDone+'')){
   res.status(400);
   res.json({
       "error":"Bad data"
   });
  }
  else{
      db.tasks.save(task, function(err, task){
         if(err)
         {
             res.send(err);
         }
         else
         {
             res.json(task);
         }
      });
  }
});
// delete a task
router.delete('/task/:id', function(req,res,next){
   db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
     if(err){
         res.send(err);
     }
     else
     {
         res.json(task);
     }
   });
});

//update a task
router.put('/task/:id', function(req,res,next){
    var task = req.body;
    var updateTask = {};

    if(task.isDone){
       updateTask.isDone = task.title;
    }
    if(task.title){
       updateTask.isDone = task.isDone;
    }
    if(!updateTask){
       res.status(400);
       res.json({
         "error" : "Bad data"
       });
    }
    else{
      db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updateTask,{},function(err, task){
     if(err){
         res.send(err);
     }
     else
     {
         res.json(task);
     }
   });
    }
});

module.exports = router;