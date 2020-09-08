    const dbConnection=require('../databases/sqlite');
    const User=dbConnection.users;
    const List=dbConnection.lists;
    const session=require('express-session');
    
    function signin(req, res) { 
  const {userId}=req.session;
      res.render("signin");
    }
    
    function signup(req, res) {
      const {userId}=req.session;
      res.render("signup"); 
    }
    
    function profile(req, res) {

      var id=null;

      User.findOne({
              where : {
                  id: req.session.userId
              }
            }).then(list => {       
                  if (list) {
                    console.log(list);
          List.findAll({
                    where:{
                      user_id: req.session.userId
                    }
                  })
          .then((list)=>{
            console.log(list);
            return res.render('profile',{list: list, msg: 'Welcome to ToDO', idTask: id});
           })
          }
        })
              
          .catch(err=>{
            return res.render('profile',{msg: err});
          });
    }

module.exports = {
          signin: signin,
          signup: signup,
          profile: profile
        };