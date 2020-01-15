import React from 'react'
import {Link} from 'react-router-dom'
import {AddToCartButton} from './index'

const ProductCard = props => {
  const {id, imageUrl, brand, model, price, rating} = props.product
  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <h4>{`${brand} ${model}`}</h4>
        <img src={imageUrl} className="card-img" />
        <h3>{`$ ${price}`}</h3>
        <h4>{rating}</h4>
      </Link>
      <AddToCartButton productId={id} />
    </div>
  )
}

export default ProductCard
