const dbConnection = require("../databases/sqlite");

const User=dbConnection.User;
const List=dbConnection.List; 

function signup(req, res) {
    const { name, email, password } = req.body;         //Line3
    if (!(name && email && password))               //Line4
      return res.render("signup", {                     //Line5
        msg: "Please enter all the required details"
      });
    else { 
      User.create({            //Line6
        name,
        email,
        password
      })
       .then(user => {       
            if (user) {
              console.log(user);
    }
})
 .catch(user=>{
   console.log('err');
 });
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
                if (user) {
                  console.log(user);
                  req.session.userId=user.id;
                  console.log('USER VALUE', req.session.userId);
                             List.findAll({
                                        where:{
                                       user_id: req.session.userId
                                     }
                          })
                  .then((list)=>{
                    console.log(list);
                    return res.render('profile',{list: list, msg: 'user signed in'});
                   })
                }
              })
              .catch(err => {
                return res.render("profile", { msg: "Error in creating user", user: err });
              });
}
  //return res.render('signup');
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
      return res.render("profile", {
    msg: 'err'
  });
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
          if (list) {
            console.log(list);
  List.findAll({
            where:{
              user_id: req.session.userId
            }
          })
  .then((list)=>{
    console.log(list);
    return res.render('profile',{list: list, msg: 'user signed in'});
   })
  }
})
      
  .catch(list=>{
    return res.render('profile',{msg: 'error in creating user'});
  });
    }
  
  
}
function display(req, res, next) {
  
  List.findAll({
              where:{
      user_id: req.session.userId
    }
            })
    .then((list)=>{
      console.log(list);
      return res.render('display',{list: list});
     })
}

function remove(req, res,id){
   
  List.destroy({
    where:{
       id: id
    }
  })
  .then(list=>{
    if(list){
      return res.render('profile', {list:list});
    }
  })
  .catch(list=>{
    return res.render('profile',{msg: 'error in deleting'});
  })

}

module.exports={
    signin: signin,
    signup: signup,
    signout: signout,
    addTask:addTask,
    display: display,
    remove: remove
};
