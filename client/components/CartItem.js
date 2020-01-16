import React from 'react';

const CartItem = ({order, id}) => {
  // console.log('cart item -', order);
  return (
    <div className="cartItemFullDiv">
      <h4>{id}</h4>
      Model:<h4>{order.model}</h4>
      Brand:<h4>{order.brand}</h4>
      Price:
      <h4>{`$${order.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</h4>
    </div>
  );
};

export default CartItem;
