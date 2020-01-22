import React from 'react';
import {Link} from 'react-router-dom';
import {AddToCartButton} from './index';

const ProductCard = props => {
  const {
      id: prodId,
      imageUrl,
      brand,
      model,
      price,
      quantity,
      totalRating,
      numberRating
    } = props.product,
    cartDetail = props.cartDetail,
    avgRating = totalRating / numberRating;

  let prodIdQty = {},
    updatedQty = quantity;
  if (cartDetail)
    cartDetail.map(prod => {
      prodIdQty[prod.productId] = prod.quantity;
    });
  if (prodId in prodIdQty) updatedQty -= prodIdQty[prodId];

  return (
    <div className="product-card">
      <Link
        to={{
          pathname: `/product/${prodId}`,
          state: {state: props.product}
        }}
        className="productCardInsideDiv"
      >
        <h4>{`${brand} ${model}`}</h4>
        <img src={imageUrl} className="card-img" />
        <h4>
          Price: {`$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
        </h4>
        {!updatedQty ? (
          <h4 className="noQtyText">Out of Stock</h4>
        ) : (
          <h4>Quantity: {updatedQty}</h4>
        )}
        <h4>Rating: {avgRating.toFixed(1)}</h4>
      </Link>
      <AddToCartButton product={props.product} updatedQty={updatedQty} />
    </div>
  );
};

export default ProductCard;
