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
   
  const item = req.body;  
  console.log("hare");       //Line3
    if (!(item)) {      //Line4
      return res.render("profile");
  }
    else { 
      List.create({   
         item,
         edit: false,
         done: 'false',
         user_id: req.session.userId
      })
        .then(list => {       
          if (list) {
            console.log(list);
            return res.render("profile");
            }
        })
        .catch(err => {
          return res.render("profile");
        });
    }
}
module.exports={
    signin: signin,
    signup: signup,
    signout: signout,
    addTask:addTask
};
