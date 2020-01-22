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
    // EMPTY CARTDETAIL STATE PRIOR TO HOMEPAGE TO DETERMINE IF NEED TO MERGE
    // this.props.emptyCartItems();
  }

  componentDidUpdate() {
    if (this.props.user.id) this.props.history.push('/');
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
      userObj.name = name;
      if (name.toLowerCase() === 'guest') {
        alert('Please use another name');
        evt.target.userName.value = '';
      } else this.props.auth(userObj);
    } else this.props.auth(userObj);
  }

  render() {
    const {formName, displayName, error} = this.props;

    return (
      <div className={`${formName}-authFormDiv authFormDiv`}>
        <h2>{displayName}</h2>
        <form onSubmit={this.handleSignIn} name={formName}>
          <div>
            <label htmlFor="email">
              <small>Email:</small>
            </label>
            <input name="email" type="email" />
          </div>

          {formName === 'signup' ? (
            <div>
              <label htmlFor="userName">
                <small>Name:</small>
              </label>
              <input name="userName" type="userName" />
            </div>
          ) : (
            ''
          )}

          <div>
            <label htmlFor="password">
              <small>Password:</small>
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
          {displayName} with Google
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
