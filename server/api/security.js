//Admin rights
function isAdmin(req, res, next) {
  if (req.user.admin) next();
  // else res.sendStatus(403);
  else res.status(403);
}

function isUserOrAdmin(req, res, next) {
  if (req.user) next();
  else res.sendStatus(403);
}

//loggedin users and admin rights

module.exports = {
  isAdmin,
  isUserOrAdmin
};
