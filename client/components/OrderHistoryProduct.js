import React from 'react';

const OrderHistoryProduct = props => {
  const element = document.querySelector('.sideBarDiv');
  if (element) element.style.opacity = 0;
  return (
    <table className="product-table">
      <thead className="product-table-head">
        <tr>
          <th className="align-words">Image</th>
          <th className="align-words">Make</th>
          <th className="align-words">Model</th>
          <th className="align-words">Category</th>
          <th className="align-words">Quantity</th>
          <th className="align-words">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img
              src={props.product.imageUrl}
              width="70px"
              className="tg-cly1"
            />
          </td>
          <td>{props.product.brand}</td>
          <td>{props.product.model}</td>
          <td>{props.product.category}</td>
          <td>{props.product.quantity}</td>
          <td>{props.product.price * props.product.quantity}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderHistoryProduct;
