import React from 'react';
import {AddToCartButton} from './index';

const SingleProduct = props => {
  const {
    imageUrl,
    brand,
    model,
    price,
    rating,
    description
  } = props.location.state.state;

  return (
    <div className="single-prod-cont">
      <h2>{`${brand} ${model}`}</h2>
      <h3>{`Price: $${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</h3>
      <img src={imageUrl} className="single-image" />
      <h3>{rating}</h3>
      <p>{description}</p>
      <div className="singleProdBtnDiv">
        <AddToCartButton product={props.location.state.state} />
        <button
          type="button"
          onClick={() => props.history.goBack()}
          className="singleProdBtn backBtn"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
