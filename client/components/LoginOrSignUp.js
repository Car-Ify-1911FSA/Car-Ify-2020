import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export default class LoginOrSignUp extends Component {
  componentDidMount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;
  }

  componentWillUnmount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 1;
  }

  render() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;

    return (
      <div className="loginOrSignupDiv">
        <br />
        <button className="login button">
          <Link to="/login" className="loginLink">
            {' '}
            Login{' '}
          </Link>
        </button>
        <div className="or">OR</div>
        <button className="signup button">
          <Link to="/signup" className="signupLink">
            {' '}
            Signup{' '}
          </Link>
        </button>
        <br />
      </div>
    );
  }
}
