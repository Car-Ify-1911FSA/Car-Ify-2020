import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout, getCartDetail, me} from '../store';
import CartIconQTY from './cart/CartIconQTY';

class Navbar extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.fetchCartDetail(false, false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id === null && this.props.user.id !== null) {
      this.props.fetchCartDetail(this.props.cart.id);
    }
  }

  render() {
    const {handleClick, isLoggedIn, isAdmin, user, cartProduct} = this.props;

    return (
      <div className="navBarDiv">
        {isLoggedIn ? (
          <h1>
            Welcome back,{' '}
            <Link to={`/userProfile/${user.id}`}>
              <span className="hpLoggedInWelcome">{user.name}</span>
            </Link>
            !
          </h1>
        ) : (
          <h1>Welcome to Car-ify !</h1>
        )}

        <nav>
          <div className="nav-links">
            <Link to="/" className="navBarText linkText">
              Home
            </Link>

            {isAdmin ? (
              <Link to="/admin" className="navBarText linkText">
                Admin Panel
              </Link>
            ) : null}

            <Link to="/allProducts" className="navBarText linkText">
              Products
            </Link>

            <Link to="/cart">
              <CartIconQTY cartProduct={cartProduct} />
            </Link>

            {isLoggedIn ? (
              <a href="#" onClick={handleClick} className="linkText">
                Logout
              </a>
            ) : (
              <Link to="/signIn" className="linkText sign-in">
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin,
    user: state.user,
    cart: state.cart,
    cartProduct: state.cartProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(me()),
    fetchCartDetail: (cartId, doNotPullLS) =>
      dispatch(getCartDetail(cartId, doNotPullLS)),
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

// PROP TYPES
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
