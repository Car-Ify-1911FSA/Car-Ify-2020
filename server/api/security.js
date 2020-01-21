//Admin rights
function isAdmin(req, res, next) {
  if (req.user.admin) next();
  else res.sendStatus(403);
}

// is loggedin user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.sendStatus(403);
}

//loggedin users and admin rights
function isUserOrAdmin(req, res, next) {
  console.log('req.session------------>', req.session);
  if (req.params.id == req.user.userId || req.user.admin) next();
  else res.sendStatus(403);
}

module.exports = {
  isAdmin,
  isLoggedIn,
  isUserOrAdmin
};
