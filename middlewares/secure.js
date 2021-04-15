module.exports = function () {
  return function secured(req, res, next) {
    if (req.user) {
      next();
    } else {
      console.log('no user');
      res.redirect('/login');
    }
  };
};
