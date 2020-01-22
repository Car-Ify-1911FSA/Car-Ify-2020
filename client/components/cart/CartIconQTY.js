import React from 'react';

class CartIconQTY extends React.Component {
  componentDidMount() {
    this.getCartQTY(this.props.cartDetail);
  }

  getCartQTY(cart) {
    if (cart) {
      return cart.reduce((accum, val) => {
        // console.log('INSIDE -', accum, val);
        return accum + val.quantity;
      }, 0);
    }
  }

  render() {
    const {cartDetail} = this.props;
    // if (cartDetail && cartDetail.length)
    // console.log('qty render -', cartDetail);

    return (
      <div className="cart-qty-div">
        <img
          src="https://findicons.com/files/icons/1681/siena/128/shopping_cart_blue.png"
          width="30px"
        />
        <div className="qty-container">
          <h4 className="cart-qty">{this.getCartQTY(cartDetail)}</h4>
        </div>
      </div>
    );
  }
}

export default CartIconQTY;
