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
    this.props.emptyCartItems();
  }

  componentDidUpdate() {
    if (this.props.user.id) this.props.history.push('/');
  }

  handleSignIn(evt) {
    evt.preventDefault();
    const formName = evt.target.name,
      email = evt.target.email.value,
      password = evt.target.password.value;

    if (formName === 'signup') {
      const name = evt.target.userName.value;
      this.props.auth(email, password, formName, name);
    } else this.props.auth(email, password, formName);
  }

  render() {
    const {formName, displayName, error, cartDetail} = this.props;
    // console.log('signin render -', cartDetail);

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
    auth: (email, password, formName, name) =>
      dispatch(auth(email, password, formName, name))
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
