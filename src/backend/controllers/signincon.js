const signinpage = (req, res, next) => {
    if (!req.session.user) {
       res.redirect("/signin");
    } else {
      next();
    }
  };
  module.exports={
      signinpage: signinpage
  }
  