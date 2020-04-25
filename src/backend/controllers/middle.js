const db=require('../databases/sqlite');
const List=db.List
const redirectprofile = (req, res, next) => {
    if (req.session.userId) {

      List.findAll({
        where:{
          user_id: req.session.userId
        }
      })
      .then(list=>{

      return res.render('profile', {msg: 'User already signed in', list: list,idTask: null});
      });
    } else {
      next();
    }
  };
  const redirectsignin = (req, res, next) => {
    if (!req.session.userId) {
      return res.render('signin');
    } else {
      next();
    }
  };

module.exports={
    redirectprofile: redirectprofile,
    redirectsignin: redirectsignin
};