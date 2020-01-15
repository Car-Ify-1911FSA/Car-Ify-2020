import React, {Component} from 'react'
import {AddToCartButton} from './index'

const SingleProduct = props => {
  const {
    id,
    imageUrl,
    brand,
    model,
    price,
    rating,
    description
  } = props.location.state.state

  return (
    <div className="single-prod-cont">
      <h2>{`${brand} ${model}`}</h2>
      <h3>{`$ ${price}`}</h3>
      <img src={imageUrl} className="single-image" />
      <h3>{rating}</h3>
      <p>{description}</p>
      <div className="singleProdBtnDiv">
        <AddToCartButton productId={id} />
        <button
          type="button"
          onClick={() => props.history.goBack()}
          className="singleProdBtn"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default SingleProduct
