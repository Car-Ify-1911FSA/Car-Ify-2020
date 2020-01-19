import React from 'react';
import CartItem from './CartItem';

const TableCart = props => {
  console.log(props);
  return (
    <table className="tg">
      <thead>
        <tr>
          <th className="tg-cly1">Image</th>
          <th className="tg-cly1">Make</th>
          <th className="tg-cly1">Model</th>
          <th className="tg-cly1">QTY</th>
          <th className="tg-cly1">Price</th>
          <th className="tg-cly1">Total</th>
        </tr>
      </thead>
      <tbody>
        {props.productDetail.map((order, idx) => (
          <CartItem
            key={idx}
            userId={props.userId}
            order={order}
            id={idx + 1}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableCart;
