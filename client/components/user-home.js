import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getActiveCart,
  addNewCart,
  loadAllProducts,
  getCartDetail,
  addNewCartDetail,
  editNewCartDetail
} from '../store';
import {Top3Products} from './';

class UserHome extends Component {
  componentDidMount() {
    this.props.fetchAllProds();
    if (this.props.userId) {
      // FIRST RETRIEVE THE CART (IF THERE ARE ANY)
      Promise.all([this.props.getCart(this.props.userId)])
        .then(() => {
          console.log('mount 1 -', this.props);
          if (!this.props.cart.id) {
            // IF THERE'S NO ACTIVE CART, ADD A NEW ONE
            const newCart = {
              status: 'active',
              time: Date(),
              userId: this.props.userId
            };
            this.props.addNewCart(this.props.userId, newCart);
          }
        })
        .then(() => {
          // PULL EXISTING CART DETAIL FROM DB ONLY (NO LS CART)
          console.log('mount 2 -', this.props);
          this.props.getCartDetail(this.props.cart.id, true);
        })
        .then(() => {
          // LEVERAGE MERGE FUNCTION TO EVALUATE SITUATION
          console.log('mount 3 -', this.props);
          this.mergeLocalCart(this.props.userId, this.props.cartDetail);
        });
    }
  }

  mergeLocalCart(userId, currentCart) {
    if (userId) {
      // ONLY EVALUATE MERGE IF USER SIGNED IN & EXISTING LS CART
      const localCart = JSON.parse(localStorage.getItem('cart'));
      console.log('merging fn -', currentCart, localCart);

      if (localCart) {
        let prodIdArr = this.props.cartDetail.map(prod => prod.productId);
        localCart.map(item => {
          if (prodIdArr.includes(item.productId)) {
            console.log('PUT ROUTE!');
          } else {
            console.log('POST ROUTE!');
          }
        });
      }
    }
  }

  render() {
    const {name, isLoggedIn} = this.props;

    return (
      <div className="homePageDiv">
        {isLoggedIn ? (
          <h3>
            Let's Keep on Shopping,{' '}
            <span className="hpLoggedInWelcome">{name}!</span>
          </h3>
        ) : (
          <h3>Remember to login or sign-up!</h3>
        )}

        <br />
        <div className="homePagePara">
          <p>
            Welcome to Car-Ify! Where your car shopping dreams can come true!
          </p>
        </div>
        <br />
        <Top3Products />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    name: state.user.name,
    cart: state.cart,
    cartDetail: state.cartProduct,
    allProduct: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getActiveCart(userId)),
    addNewCart: (userId, newCart) => dispatch(addNewCart(userId, newCart)),
    fetchAllProds: () => dispatch(loadAllProducts()),
    getCartDetail: cartId => dispatch(getCartDetail(cartId)),
    addCartItem: (isLoggedIn, newCartItem) =>
      dispatch(addNewCartDetail(isLoggedIn, newCartItem)),
    editCartItem: (isLoggedIn, editCartItem) =>
      dispatch(editNewCartDetail(isLoggedIn, editCartItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

// PROP TYPES
UserHome.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string
};
