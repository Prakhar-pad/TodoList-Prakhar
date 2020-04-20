    const dbConnection=require('../databases/sqlite');
    const User=dbConnection.User;
    const List=dbConnection.List;
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

      User.findOne({
              where : {
                  id: req.session.userId
              }
            }).then(user => {       
                  if (user) {
                    console.log(user);
                    req.session.userId=user.id;
                    console.log('USER VALUE', req.session.userId);
                    return res.render("profile")
                  }
                })
                .catch(err => {
                  return res.render("profile");
                });
    }

module.exports = {
          signin: signin,
          signup: signup,
          profile: profile
        };