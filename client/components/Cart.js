import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getActiveCart, getCartDetail} from '../store';
import TableCart from './TableCart';

class Cart extends Component {
  constructor() {
    super();
    this.calcTotalQuantity = this.calcTotalQuantity.bind(this);
    this.calcTotalPrice = this.calcTotalPrice.bind(this);
    this.mergeCartProd = this.mergeCartProd.bind(this);
    this.headerText = this.headerText.bind(this);
  }

  componentDidMount() {
    if (this.props.userId) {
      Promise.all([this.props.fetchCart(this.props.userId)]).then(() => {
        this.props.fetchCartDetail(this.props.cart.id);
      });
    } else {
      this.props.fetchCart();
      this.props.fetchCartDetail();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      Promise.all([this.props.fetchCart(this.props.userId)]).then(() => {
        this.props.fetchCartDetail(this.props.cart.id);
      });
    }
  }

  calcTotalQuantity(cartDetail) {
    let total = 0;
    if (!cartDetail) return total;
    cartDetail.forEach(item => {
      total += item.quantity;
    });
    return total;
  }

  calcTotalPrice(cartDetail) {
    let total = 0;
    if (!cartDetail) return `$${total}`;
    cartDetail.forEach(item => {
      total += item.totalPrice;
    });
    return `$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  mergeCartProd(cartDetail, products) {
    if (!cartDetail || !products.length) return [];

    const mergedArr = [];
    cartDetail.map(item => {
      const obj = {...item};
      const match = products.find(car => car.id === item.productId);
      obj.brand = match.brand;
      obj.model = match.model;
      obj.price = match.price;
      obj.imageUrl = match.imageUrl;
      mergedArr.push(obj);
    });

    return mergedArr;
  }

  headerText(userName) {
    return userName ? `${userName}'s Cart` : `Guest's Cart`;
  }

  render() {
    const {userId, userName, cartDetail, allProducts} = this.props;
    const productDetail = this.mergeCartProd(cartDetail, allProducts);

    return (
      <div className="cartFullDiv">
        <h1>{this.headerText(userName)}</h1>

        {!productDetail || productDetail.length < 1 ? (
          <div className="cartProductDiv">
            <h3>Cart Currently Has No Items</h3>
          </div>
        ) : (
          <TableCart userId={userId} productDetail={productDetail} />
        )}

        <div className="cartTotalDiv">
          <h3 className="headerDiv">Cart Summary</h3>
          <h4>Total Quantity: {this.calcTotalQuantity(cartDetail)}</h4>
          <h4>Total Price: {this.calcTotalPrice(cartDetail)}</h4>
        </div>

        <div className="cartBtnDiv">
          {cartDetail && cartDetail.length > 0 ? (
            <Link
              to={
                userName
                  ? {
                      pathname: '/paymentAccounts',
                      state: {cart: this.props.cart, cartDetail: cartDetail}
                    }
                  : {
                      pathname: '/signIn',
                      state: {cart: this.props.cart, cartDetail: cartDetail}
                    }
              }
              className="paymentLinkBtn linkText"
            >
              {userName ? `Let's Pay !` : `Please Sign In !`}
            </Link>
          ) : (
            <Link to="/allProducts" className="paymentLinkBtn linkText">
              Let's Go Shop
            </Link>
          )}
          <button
            type="button"
            onClick={() => this.props.history.push('/allProducts')}
            className="paymentLinkBtn linkText"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    userName: state.user.name,
    cart: state.cart,
    cartDetail: state.cartProduct,
    allProducts: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: userId => dispatch(getActiveCart(userId)),
    fetchCartDetail: cartId => dispatch(getCartDetail(cartId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
