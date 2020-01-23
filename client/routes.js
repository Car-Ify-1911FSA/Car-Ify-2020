import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
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
  UpdateProfile,
  OrderHistory,
  AdminHome,
  RecentHistory
} from './components';
import {me} from './store';

const AdminRoute = ({component: Comp, condition, redirect, path}) => {
  return (
    <Route
      path={path}
      render={props =>
        condition ? <Comp {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isAdmin} = this.props;
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
        <Route path="/orderHistory/:id" component={OrderHistory} />
        <Route path="/recentOrderHistory/:id" component={RecentHistory} />
        <AdminRoute
          path="/admin"
          component={AdminHome}
          condition={isAdmin}
          redirect="/"
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin,
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
