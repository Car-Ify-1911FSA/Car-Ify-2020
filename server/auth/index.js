const router = require('express').Router();
const {
  User,
  Cart,
  CartProduct,
  Product,
  PaymentAccount
} = require('../db/models');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const {email, password, guestCart} = req.body;
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      console.log('No such user found:', email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email);
      res.status(401).send('Wrong username and/or password');
    } else {
      // ------------------ MERGING ACTIVITY ------------------ //
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
      let cartDetail = await CartProduct.findAll({where: {cartId: cartId}});

      // IF GUESTCART PRESENT, SEARCH FOR CARTDETAIL AND UPDATE ACCORDINGLY
      if (guestCart) {
        if (cartDetail.length) {
          // EVALUATING EXISTING CART ON UPDATING / CREATING NEW ITEMS
          const prodIdArr = cartDetail.map(prod => prod.productId);
          const promises = guestCart.map(async item => {
            if (prodIdArr.includes(item.productId)) {
              // UPDATE EXISTING ITEM IN CART DETAIL
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
              // CREATE NEW ITEM IN CART DETAIL
              item.cartId = cartId;
              const response = await CartProduct.create(item);
              return response;
            }
          });
          await Promise.all(promises);
        } else {
          // CREATE EVERY ITEM IN CART DETAIL SINCE ZERO EXISTING ITEMS
          const promises = guestCart.map(async item => {
            item.cartId = cartId;
            const response = await CartProduct.create(item);
            return response;
          });
          await Promise.all(promises);
        }
        cartDetail = await CartProduct.findAll({
          where: {cartId: cartId}
        });
      }

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
    // CREATE NEW USER AND CART
    const {email, name, password, guestCart} = req.body;
    const user = await User.create({email, name, password});
    const cart = await Cart.create({
      status: 'active',
      time: Date(),
      userId: user.id
    });

    // IF EXISTING GUEST CART THEN CREATE NEW DETAIL ITEMS IN NEW CART
    if (guestCart) {
      const promises = guestCart.map(async item => {
        item.cartId = cart.dataValues.id;
        const response = await CartProduct.create(item);
        return response;
      });
      await Promise.all(promises);
    }

    // PULL CART DETAIL
    const cartDetail = await CartProduct.findAll({
      where: {cartId: cart.dataValues.id}
    });

    // SEND UPDATED DATA
    req.login(user, err =>
      err ? next(err) : res.json({user, cart, cartDetail})
    );
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

let guestCount = 0;

router.post('/guest', async (req, res, next) => {
  try {
    console.log('GETTING IT GOING -', req.body);
    const {paymentTypeId, paymentAccount, cartDetail} = req.body;

    // CREATE NEW USER
    const guestUser = {
      email: `guest${guestCount}@email.com`,
      name: 'guest',
      password: 'guest'
    };
    const user = await User.create(guestUser);
    guestCount++;

    // CREATE NEW PAYMENT ACCOUNT
    const guestPayment = await PaymentAccount.create({
      name: paymentAccount,
      paymentId: paymentTypeId,
      userId: user.id
    });

    // CREATE NEW CART WITH AUTOMATIC PAID STATUS
    const cart = await Cart.create({
      status: 'paid',
      time: Date(),
      userId: user.id,
      paymentAccountId: guestPayment.id
    });

    // CREATE NEW DETAIL ITEMS IN NEW CART
    const createPromise = cartDetail.map(async item => {
      item.cartId = cart.dataValues.id;
      const response = await CartProduct.create(item);
      return response;
    });
    await Promise.all(createPromise);

    // DECREMENT QUANTITY FROM PRODUCT TABLE
    const updatePromise = cartDetail.map(async item => {
      console.log('WOAH -', item);
    });
    await Promise.all(updatePromise);

    // SEND SUCCESS MESSAGE (NO NEED FOR DATA SINCE WON'T USE)
    res
      .status(200)
      .json({message: 'Guest user and cart managed successfully!'});
  } catch (err) {
    next(err);
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
