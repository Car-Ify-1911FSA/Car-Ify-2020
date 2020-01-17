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
  PaymentAccounts
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
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/allProducts" component={AllProducts} />
        <Route path="/product/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/paymentAccounts" component={PaymentAccounts} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
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
