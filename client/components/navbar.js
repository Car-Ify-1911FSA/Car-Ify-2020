import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({handleClick, isLoggedIn, name}) => {
  return (
    <div className="navBarDiv">
      {isLoggedIn ? (
        <h1>
          Welcome back, <span className="hpLoggedInWelcome">{name}</span>!
        </h1>
      ) : (
        <h1>Welcome to Car-ify !</h1>
      )}

      <nav>
        <div className="nav-links">
          <Link to="/" className="navBarText linkText">
            Home
          </Link>

          <Link to="/allProducts" className="navBarText linkText">
            Products
          </Link>

          <Link to="/cart" className="navBarText linkText cart-img ">
            <img
              src="https://findicons.com/files/icons/1681/siena/128/shopping_cart_blue.png"
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
    name: state.user.name
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
