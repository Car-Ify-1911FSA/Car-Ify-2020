import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import CartIconQTY from './cart/CartIconQTY';

const Navbar = ({handleClick, isLoggedIn, isAdmin, user, cartProduct}) => {
  return (
    <div className="navBarDiv">
      {isLoggedIn ? (
        <h1>
          Welcome back, <span className="hpLoggedInWelcome">{user.name}</span>!
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

          <Link to={`/userProfile/${user.id}`}>
            <img
              src="https://findicons.com/files/icons/1676/primo/128/user.png"
              width="30px"
            />
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
};

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin,
    user: state.user,
    cartProduct: state.cartProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
