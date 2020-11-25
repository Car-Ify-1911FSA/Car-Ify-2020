const router = require('express').Router();
const {User} = require('../db/models');
const {isAdmin} = require('./security');

router.get('/', isAdmin, async (req, res, next) => {
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

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;

    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
