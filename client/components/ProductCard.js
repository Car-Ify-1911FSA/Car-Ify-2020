import React from 'react';
import {Link} from 'react-router-dom';
import {AddToCartButton} from './index';

const ProductCard = props => {
  const {
      id,
      imageUrl,
      brand,
      model,
      price,
      quantity,
      totalRating,
      numberRating
    } = props.product,
    avgRating = totalRating / numberRating;

  return (
    <div className="product-card">
      <Link
        to={{
          pathname: `/product/${id}`,
          state: {state: props.product}
        }}
        className="productCardInsideDiv"
      >
        {/* <div className="productCardInsideDiv"> */}
        {/* <div> */}
        <h4>{`${brand} ${model}`}</h4>
        <img src={imageUrl} className="card-img" />
        <h4>
          Price: {`$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
        </h4>
        <h4>Quantity: {quantity}</h4>
        <h4>Rating: {avgRating.toFixed(1)}</h4>
        {/* </div> */}
      </Link>
      <AddToCartButton productId={id} />
    </div>
  );
};

export default ProductCard;
