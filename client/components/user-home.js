import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
  }

  render() {
    const {name, userId, isLoggedIn} = this.props;

    return (
      <div className="homePageDiv">
        <br />
        <div className="homePagePara"></div>
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
