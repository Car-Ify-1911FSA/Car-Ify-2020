const router = require('express').Router();
const {User} = require('../db/models');
// const {ensureAuthenticated} = require('./index');

function ensureAuthenticated(req, res, next) {
  if (req.user.admin) next();
  else res.sendStatus(403);
}

router.get('/', ensureAuthenticated, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'name']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
