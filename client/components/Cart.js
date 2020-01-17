import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getActiveCart, getCartDetail} from '../store';
import {Link} from 'react-router-dom';
import CartItem from './CartItem';

class Cart extends Component {
  constructor() {
    super();
    this.calcTotalQuantity = this.calcTotalQuantity.bind(this);
    this.calcTotalPrice = this.calcTotalPrice.bind(this);
    this.mergeCartProd = this.mergeCartProd.bind(this);
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

  getProductDataForGuest(inventory, cartProd) {
    return cartProd.map(prod => {
      return inventory.find(el => el.id === prod.productId);
    });
  }

  mergeCartProd(cartDetail, products) {
    if (!cartDetail || !products || !products[0]) return [];

    let mergedArr = [];
    cartDetail.map(item => {
      let obj = {...item};
      products.map(prod => {
        if (prod.id === item.productId) {
          obj.brand = prod.brand;
          obj.model = prod.model;
        }
      });
      mergedArr.push(obj);
    });
    return mergedArr;
  }

  render() {
    const {cart, cartDetail, allProducts} = this.props;
    const guestCart = JSON.parse(localStorage.getItem('cart'));
    const guestProd = this.getProductDataForGuest(allProducts, guestCart);
    const products = this.props.userId
      ? cart
        ? cart.products
        : undefined
      : guestProd;

    const productDetail = this.mergeCartProd(cartDetail, products);

    return (
      <div className="cartFullDiv">
        <h1>{this.props.userName ? this.props.userName : 'Guest'}'s Cart</h1>

        {!productDetail || productDetail.length < 1 ? (
          <div className="cartProductDiv">
            <h3>Cart Currently Has No Items</h3>
          </div>
        ) : (
          <div className="cartProductDiv">
            <h3 className="headerDiv">Cart Items</h3>
            {productDetail.map((order, idx) => (
              <CartItem key={idx} order={order} id={idx + 1} />
            ))}
          </div>
        )}

        <div className="cartTotalDiv">
          <h3 className="headerDiv">Cart Summary</h3>
          <h5>Total Quantity: {this.calcTotalQuantity(cartDetail)}</h5>
          <h5>Total Price: {this.calcTotalPrice(cartDetail)}</h5>
        </div>

        <div className="cartBtnDiv">
          {cartDetail && cartDetail.length > 0 ? (
            <Link
              to={{
                pathname: '/paymentAccounts',
                state: {cart: this.props.cart, cartDetail: cartDetail}
              }}
              className="paymentLinkBtn linkText"
            >
              Let's Pay !
            </Link>
          ) : (
            <Link to="/allProducts" className="paymentLinkBtn linkText">
              Let's Go Shop
            </Link>
          )}
          <button
            type="button"
            onClick={() => this.props.history.push('/allProducts')}
            className="paymentActBackBtn backBtn linkText"
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
