import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getActiveCart, adddNewCart, addNewCartDetail} from '../store';

class AddToCartButton extends Component {
  constructor() {
    super();
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  componentDidMount() {
    this.props.getCart(this.props.userId);
  }

  handleAddClick(productId) {
    const {isLoggedIn, userId, cartId} = this.props;

    // FOLLOWING LOGIC:
    // IF CARTID AVAILABLE (SIGNIFYING "ACTIVE" ONE), POST THERE WITH PRODID
    // OTHERWISE CREATE NEW CARTID WITH USERID AND POST TO BOTH TABLES

    if (isLoggedIn) {
      if (cartId) console.log('POST TO CARTPROD');
      else console.log('POST TO CART AND CARTPROD');
    } else {
      console.log('Need Local Storage Functionality for Guests');
    }
  }

  render() {
    return (
      <div className="addBtnDiv">
        <button
          type="button"
          onClick={() => this.handleAddClick(this.props.productId)}
          className="addBtn"
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    cartId: state.cart.id
  };
};

const mapDispatch = dispatch => {
  return {
    getCart: userId => {
      dispatch(getActiveCart(userId));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(AddToCartButton));
