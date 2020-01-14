import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {id, imageUrl, brand, model, price, rating} = props.product
  return (
    <div>
      <Link to={`/product/${id}`}>
        <img src={imageUrl} />
        <h4>{`${brand} ${model}`}</h4>
        <h3>{price}</h3>
        <h4>{rating}</h4>
      </Link>
    </div>
  )
}

export default ProductCard