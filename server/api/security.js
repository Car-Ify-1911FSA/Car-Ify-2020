//Admin rights
function isAdmin(req, res, next) {
  if (req.user.admin) next();
  else res.sendStatus(403);
}

//loggedin users and admin rights
function isUserOrAdmin(req, res, next) {
  req.params.id == req.user.userId || req.user.admin
    ? next()
    : res.sendStatus(403);
}

module.exports = {
  isAdmin,
  isUserOrAdmin
};