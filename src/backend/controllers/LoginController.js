const dbConnection = require("../databases/sqlite");

const User=dbConnection.User;
const List=dbConnection.List; 

function signup(req, res) {
    const { name, email, password } = req.body;         //Line3
    if (!(name && email && password))                   //Line4
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
            req.session.userId=user.id;
            console.log('USER VALUE', req.session.userId);
            return res.render("profile", {        //Line7
              msg: "User successfully created",
              user: user.name
            });
          }
        })
        .catch(err => {
          return res.render("profile", { msg: "Error in creating user", user: err });
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
                  return res.render("profile", {        //Line7
                    msg: "User successfully created",
                    user: user.name
                  });
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
}
})
  .catch(list=>{
    return res.render('profile',{msg: 'error in creating user'});
  });
    }
  
  
}
function display(req, res, next) {
  
  List.findAll({
              attributes: [['item', 'item_id']]
            })
    .then((list)=>{
      console.log(list);
      return res.render('display',{list: list});
  
     })

    
}

module.exports={
    signin: signin,
    signup: signup,
    signout: signout,
    addTask:addTask,
    display: display
};
