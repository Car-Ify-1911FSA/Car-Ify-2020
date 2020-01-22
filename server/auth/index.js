const router = require('express').Router();
const {User, Cart, CartProduct} = require('../db/models');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    console.log('user post 1 -', req.body);
    const {email, password, guestCart} = req.body;
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      console.log('No such user found:', email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email);
      res.status(401).send('Wrong username and/or password');
    } else {
      // ---------------- MERGING ACTIVITY  ---------------- //
      const {id: userId} = user.dataValues;

      // SEARCH FOR CART, CREATE ONE IF NOT AVAILABLE
      let cart = await Cart.findOne({
        where: {userId: userId, status: 'active'}
      });
      if (!cart) {
        cart = await Cart.create({
          status: 'active',
          time: Date(),
          userId: userId
        });
      }
      const {id: cartId} = cart.dataValues;

      // SEARCH FOR CARTDETAIL, UPDATE / CREATE NEW ITEMS WHERE NEEDED
      let cartDetail = await CartProduct.findAll({where: {cartId: cartId}});
      console.log('user post 2 -', userId, cartId, cartDetail.length);
      if (cartDetail.length) {
        // cartDetail.map(item => console.log('WOAH -', item.dataValues));
        const prodIdArr = cartDetail.map(prod => prod.productId);
        console.log('updating - ', guestCart, prodIdArr, cartDetail);
        const promises = guestCart.map(async item => {
          if (prodIdArr.includes(item.productId)) {
            // PUT ROUTE
            console.log('PUT || MERGING ROUTE');
            const targetItem = await CartProduct.findOne({
              where: {
                cartId: cartId,
                productId: item.productId
              }
            });
            await targetItem.update({
              quantity: targetItem.quantity + item.quantity,
              totalPrice: targetItem.totalPrice + item.totalPrice
            });
            return targetItem;
          } else {
            // POST ROUTE
            console.log('POST || MERGING ROUTE');
            item.cardId = cartId;
            const response = await CartProduct.create(item);
            return response;
          }
        });
        const result = await Promise.all(promises);
      } else {
        const promises = guestCart.map(async item => {
          item.cartId = cartId;
          const response = await CartProduct.create(item);
          return response;
        });
        const result = await Promise.all(promises);
        result.map(x => console.log('NICE JOB -', x.dataValues));
      }
      cartDetail = await CartProduct.findAll({
        where: {cartId: cartId}
      });

      console.log(
        'user post final -',
        user.dataValues,
        cart.dataValues,
        cartDetail
      );

      // SEND UPDATED DATA
      req.login(user, err =>
        err ? next(err) : res.json({user, cart, cartDetail})
      );
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    console.log('sign up post -', req.body);
    const user = await User.create(req.body);
    const cart = await Cart.create({
      status: 'active',
      time: Date(),
      userId: user.id
    });
    req.login(user, err => (err ? next(err) : res.json({user, cart})));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
