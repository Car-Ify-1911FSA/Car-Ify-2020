import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, email}) => (
  <div className="navBarDiv">
    {isLoggedIn ? (
      <h1>
        Welcome back, <span className="hpLoggedInWelcome">{email}</span>!
      </h1>
    ) : (
      <h1>Welcome to Car-ify !</h1>
    )}
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/" className="navBarText linkText">
            Home
          </Link>

          <Link to="/cart" className="navBarText linkText">
            Cart
          </Link>

          <a href="#" onClick={handleClick} className="linkText">
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/" className="linkText">
            Home
          </Link>
          <Link to="/login" className="linkText">
            Login
          </Link>
          <Link to="/signup" className="linkText">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
