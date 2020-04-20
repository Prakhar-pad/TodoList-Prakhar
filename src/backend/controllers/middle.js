const redirectprofile = (req, res, next) => {
    if (req.session.userId) {
      return res.render('profile');
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