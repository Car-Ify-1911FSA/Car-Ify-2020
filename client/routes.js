import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  Cart,
  SingleProduct,
  PaymentAccounts,
  UserProfile,
  UpdateProfile
} from './components';
import {me} from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={UserHome} />
        <Route
          path="/signIn"
          render={props => (
            <div className="signInFullDiv">
              <Login />
              <Signup />
            </div>
          )}
        />
        <Route path="/allProducts" component={AllProducts} />
        <Route path="/product/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/paymentAccounts" component={PaymentAccounts} />
        <Route path="/userProfile/:id" component={UserProfile} />
        <Route path="/updateProfile/:id" component={UpdateProfile} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
