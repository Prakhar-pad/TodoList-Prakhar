const dbConnection = require("../databases/sqlite");

const User=dbConnection.users;
const List=dbConnection.lists; 

function signup(req, res) {
  
    const { name, email, password } = req.body;   
    if (!(name && email && password))             
      return res.render("signup");
    
      
    else { 
      User.create({            //Line6
        name,
        email,
        password
      })
    .then(user=>{
      req.session.userId=user.id;
      console.log(user);
      console.log('value of user.id=',req.session.userId );

      return res.render('profile', {msg: 'user signed up',list: List, idTask: null});
    })
  .catch(err=>{
    console.log(err);
    return res.render('signup');
  })
     
 }  
}

function signin (req, res){ 

    const { email, password}= req.body; 
    console.log('email value', req.body);
    console.log('email: ', email);

  if(email && password){ 
    User.findOne({
            where : {
              email: email,
              password: password
            } 
          }).then(user => {      
                  req.session.userId=user.id;
                  console.log('USER VALUE', req.session.userId);
                             List.findAll({
                                        where:{
                                       user_id: req.session.userId
                                     }
                          })
                  .then((list)=>{
                    console.log(list);
                    return res.render('profile',{list: list, msg: 'user signed in', idTask: null});
                   })
         
              })
              .catch(err => {
          console.log(err)
                return res.render("signup");
              });
}

} 
 
function signout(req,res){
  req.session.destroy(err=>{
    if(err){
      return res.render(profile);
    }
    res.clearCookie(req.session);
    return res.render('signin');
  });

}
function addTask(req,res){ 
   
  const {addTask} = req.body;
  console.log("item value", addTask);  
  console.log('req :',req.body);       //Line3
    if (!(addTask)) {    
     
    console.log('inside !(addTask)');
      return res.redirect("signup");
  }
    else { 
    console.log('inside else', addTask);
      List.create({   
         item: addTask,
         edit: false,
         done: 'false',
         user_id: req.session.userId
      })  
        .then(list => {       
  console.log('session id =',req.session.userId)
  List.findAll({
            where:{
              user_id: req.session.userId
            }
          })
  .then((list)=>{
    return res.render('profile',{list: list, msg: 'user signed in', idTask: null});
   })
  })
      
  .catch(err=>{
    return res.render('profile',{msg: 'error in creating user', list:list});
    });
}
}

function remove(req, res){

  var id=req.param('id');
  console.log('value of id=', id);

  List.destroy({
    where:{
      id: id
    }
  })
  .then(list => {       
            if (list) {
              console.log(list);
    List.findAll({
              where:{
                user_id: req.session.userId
              }
            })
    .then((list)=>{
      console.log(list);
      return res.render('profile',{list: list, msg: 'task deleted', idTask: null});
     })
    }
  })
        
    .catch(err=>{
      return res.render('profile',{msg: 'error in deleting task'});
    });
}

function editGet(req, res){

  var id=req.param('id');

  List.findAll({
              where:{
                user_id: req.session.userId
              }
            })
    .then((list)=>{
      console.log(list);
      return res.render('profile',{list: list, msg: 'Editing task', idTask: id});
     })
        
    .catch(err=>{
      return res.render('profile',{msg: 'error in editing'});
    });

}
function editPost(req, res){

  var id=req.param('id');

  var {content}=req.body;
  console.log('value of content=', content);

  List.update({
   item: content,
   edit: true
  },
  
  { where:{
     id: id
   }
  
  })
  List.findAll({
    where:{
      user_id: req.session.userId
    }
        })
.then((list)=>{
console.log(list);
return res.render('profile',{list: list, msg: 'task edited', idTask: null});
})

.catch(err=>{
return res.render('profile',{msg: 'error in editing'});
});
}

function done(req, res){
 
  var id=req.param('id');

  List.update({
   
    item: 'Task completed'},
    {
      where:{
         id: id
      }
  })
  List.findAll({
     
    where: {
      user_id: req.session.userId
    }

  })
  .then(list=>{
    return res.render('profile', {msg: 'task completed', list: list, idTask: null})
  })
  .catch(err=>{
    return res.render('profile', {msg: 'error'});
    })

}

module.exports={
    signin: signin,
    signup: signup,
    signout: signout,
    addTask:addTask,
    remove: remove,
    editGet: editGet,
    editPost: editPost,
    done: done

};
