import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {auth, emptyCartItems} from '../store';

class AuthForm extends Component {
  constructor() {
    super();
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    // EMPTY CART WHEN GOING TO AUTH POST LOGGED-IN (USING GUESTCART AS PROXY)
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;

    const guestCart = JSON.parse(localStorage.getItem('cart'));
    if (!guestCart) this.props.emptyCartItems();
  }

  componentDidUpdate() {
    if (this.props.user.id) this.props.history.push('/');
  }

  componentWillUnmount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 1;
  }

  handleSignIn(evt) {
    evt.preventDefault();
    const userObj = {
      formName: evt.target.name,
      email: evt.target.email.value,
      password: evt.target.password.value,
      guestCart: JSON.parse(localStorage.getItem('cart'))
    };

    if (evt.target.name === 'signup') {
      const name = evt.target.userName.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      userObj.name = name;
      if (email.toLowerCase().startsWith('guest')) {
        alert('Please use another email');
        evt.target.email.value = '';
      } else if (name.toLowerCase() === 'guest') {
        alert('Please use another name');
        evt.target.userName.value = '';
      } else if (email === '' || name === '' || password === '') {
        alert('Please enter email, password and name');
      } else this.props.auth(userObj);
    } else this.props.auth(userObj);
  }

  render() {
    const {formName, displayName, error} = this.props;

    return (
      <div className={`${formName}-authFormDiv authFormDiv`}>
        <h2 className="formName">{displayName}</h2>
        <form onSubmit={this.handleSignIn} name={formName} className="authForm">
          <div>
            <label htmlFor="email">
              <small className="email">Email</small>
            </label>
            <input name="email" type="email" />
          </div>

          {formName === 'signup' ? (
            <div>
              <label htmlFor="userName">
                <small className="name">Name</small>
              </label>
              <input name="userName" type="userName" />
            </div>
          ) : (
            ''
          )}

          <div>
            <label htmlFor="password">
              <small className="password">Password</small>
            </label>
            <input name="password" type="password" />
          </div>

          <div>
            <button type="submit" className="authSignInBtn">
              {displayName}
            </button>
          </div>

          {error && error.response && <div> {error.response.data} </div>}
        </form>

        <a href="/auth/google" className="linkText">
          <img
            src="https://cdn0.iconfinder.com/data/icons/social-icons-16/512/Google-2-512.png"
            width="30px"
            className="google-icon"
          />
          <div>{displayName} with Google </div>
        </a>
      </div>
    );
  }
}

const mapLogin = state => {
  return {
    formName: 'login',
    displayName: 'Login',
    user: state.user,
    cartDetail: state.cartProduct,
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    formName: 'signup',
    displayName: 'Sign Up',
    user: state.user,
    cartDetail: state.cartProduct,
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCartItems() {
      dispatch(emptyCartItems());
    },
    auth: userObj => dispatch(auth(userObj))
  };
};

export const Login = withRouter(
  connect(mapLogin, mapDispatchToProps)(AuthForm)
);
export const Signup = withRouter(
  connect(mapSignup, mapDispatchToProps)(AuthForm)
);

// PROP TYPES
AuthForm.propTypes = {
  formName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object
};
