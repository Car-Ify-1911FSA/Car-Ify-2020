import React from 'react';

const OrderHistoryProduct = props => {
  console.log(props.product);

  // return(<div className='tg'>
  //     <div>{props.product.brand}:</div>
  //    <div>{props.product.model}</div>
  //    <div>{props.product.categor}y</div>
  //    <div>{props.product.color}</div>
  //    <div>{props.product.price}</div>
  //    <img src={props.product.imageUrl} width='70px' className='tg-cly1'/>
  //    </div>
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th className="align-words">Image</th>
          <th className="align-words">Make</th>
          <th className="align-words">Model</th>
          <th className="align-words">Color</th>
          <th className="align-words">Category</th>
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
          <td>{props.product.color}</td>
          <td>{props.product.category}</td>
          <td>{props.product.price}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderHistoryProduct;
