import React from 'react';

class CartIconQTY extends React.Component {
  componentDidMount() {
    this.getCartQTY(this.props.cartProduct);
  }

  getCartQTY(cart) {
    if (cart) {
      return cart.reduce((accum, val) => {
        return accum + val.quantity;
      }, 0);
    }
  }

  render() {
    const {cartProduct} = this.props;
    return (
      <div>
        <img
          src="https://findicons.com/files/icons/1681/siena/128/shopping_cart_blue.png"
          width="30px"
        />
        <h5>{this.getCartQTY(cartProduct)}</h5>
      </div>
    );
  }
}

export default CartIconQTY;
