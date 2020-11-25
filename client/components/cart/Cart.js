import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getActiveCart, getCartDetail} from '../../store';
import TableCart from './TableCart';
import axios from 'axios';

class Cart extends Component {
  constructor() {
    super();
    this.calcTotalQuantity = this.calcTotalQuantity.bind(this);
    this.calcTotalPrice = this.calcTotalPrice.bind(this);
    this.mergeCartProd = this.mergeCartProd.bind(this);
    this.headerText = this.headerText.bind(this);
    this.sort = this.sort.bind(this);
  }

  componentDidMount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;
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

  componentWillUnmount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 1;
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

  sort(array) {
    let moves = 1;
    while (moves > 0) {
      moves = 0;
      for (let i = 1; i < array.length; i++) {
        const element = array[i - 1],
          element2 = array[i];
        if (element.id > element2.id) {
          moves++;
          let temp = array[i - 1];
          array[i - 1] = array[i];
          array[i] = temp;
        }
      }
    }
    return array;
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
    return userName ? `User's Cart` : `Guest's Cart`;
  }

  render() {
    const {userId, userName, cartDetail, allProducts} = this.props;
    const productDetail = this.sort(
      this.mergeCartProd(cartDetail, allProducts)
    );
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;

    return (
      <div className="cartFullDiv">
        <h1 className="cartName">{this.headerText(userName)}</h1>

        {!productDetail || productDetail.length < 1 ? (
          <div className="cartProductDiv">
            <h3>Cart Currently Has No Items</h3>
          </div>
        ) : (
          <TableCart userId={userId} productDetail={productDetail} />
        )}

        <div className="cartTotalDiv">
          <h3 className="headerDiv">Cart Summary</h3>
          <div className="cartTotalItems">
            <div className="cartTotalTextDiv">
              <h4 className="cartTotalText">
                Total Quantity: {this.calcTotalQuantity(cartDetail)}
              </h4>
            </div>
            <div className="cartTotalTextDiv">
              <h4 className="cartTotalText">
                Total Price: {this.calcTotalPrice(cartDetail)}
              </h4>
            </div>
          </div>
        </div>

        <div className="cartOuterBtnDiv">
          {cartDetail && cartDetail.length > 0 ? (
            <div className="cartBtnDiv">
              <Link
                to={{
                  pathname: '/paymentAccounts',
                  state: {cart: this.props.cart, cartDetail: cartDetail}
                }}
                className="paymentLinkBtn linkText"
              >
                Proceed to Checkout
              </Link>

              <button
                type="button"
                onClick={() => this.props.history.push('/allProducts')}
                className="paymentLinkBtn linkText"
              >
                Back to Products
              </button>
            </div>
          ) : (
            <Link
              to="/allProducts"
              className="paymentLinkBtn linkText"
              id="letsShopButton"
            >
              Let's Go Shop
            </Link>
          )}
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
