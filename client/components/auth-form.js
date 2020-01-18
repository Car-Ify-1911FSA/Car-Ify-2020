import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';

const AuthForm = props => {
  const {formName, displayName, handleSubmit, error} = props;

  return (
    <div className={`${formName}-authFormDiv authFormDiv`}>
      <h2>{displayName}</h2>
      <form onSubmit={handleSubmit} name={formName}>
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
};

const mapLogin = state => {
  return {
    formName: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    formName: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;

      if (formName === 'signup') {
        const name = evt.target.userName.value;
        dispatch(auth(email, password, formName, name));
      } else dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

// PROP TYPES
AuthForm.propTypes = {
  formName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
