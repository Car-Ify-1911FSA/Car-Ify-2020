function isUserOrAdmin(req, res, next) {
  // console.log('req.session------------>', req.session.passport.user);
  if (req.user) next();
  else res.sendStatus(403);
}

//Admin rights
function isAdmin(req, res, next) {
  if (req.user.admin) next();
  else res.sendStatus(403);
}

// is loggedin user
// function isLoggedIn(req, res, next) {
//   console.log('req.isAuthenticated---------------->', req.isAuthenticated());
//   if (req.isAuthenticated()) next();
//   else res.sendStatus(403);
// }

//loggedin users and admin rights

module.exports = {
  isAdmin,
  isUserOrAdmin
};
