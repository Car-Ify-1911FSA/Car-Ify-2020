import React from 'react';
import CartItem from './CartItem';

const TableCart = props => {
  return (
    <table className="tg">
      <thead>
        <tr className="tableHeader">
          <th className="tg-cly1 tableHeader">Image</th>
          <th className="tg-cly1 tableHeader">Make</th>
          <th className="tg-cly1 tableHeader">Model</th>
          <th className="tg-cly1 tableHeader">QTY</th>
          <th className="tg-cly1 tableHeader">Price</th>
          <th className="tg-cly1 tableHeader">Total</th>
        </tr>
      </thead>
      <tbody>
        {props.productDetail.map((order, idx) => (
          <CartItem
            key={idx}
            userId={props.userId}
            order={order}
            id={idx + 1}
          ></CartItem>
        ))}
      </tbody>
    </table>
  );
};

export default TableCart;
