import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadAllProducts} from '../store'

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const products = this.props.allProducts
    const brand = [],
      category = [],
      condition = [],
      price = []
    products.forEach(car => {
      if (!brand.includes(car.brand)) brand.push(car.brand)
      if (!category.includes(car.category)) category.push(car.category)
      if (!condition.includes(car.condition)) condition.push(car.condition)
      if (!price.includes(car.price)) price.push(car.price)
    })

    console.log('render -', products, brand, category, condition, price)

    return (
      <div className="sideBarDiv">
        <Link to="/allProducts" className="linkText">
          View All Products
        </Link>

        <div className="sideBarBrandDiv">
          <span>Brand: </span>
          <br />
          <select className="sideBarSelect">
            {brand.map((idvBrand, idx) => (
              <option key={idx}>{idvBrand}</option>
            ))}
          </select>
        </div>

        <div className="sideBarCategoryDiv">
          <span>Category: </span>
          <br />
          <select className="sideBarSelect">
            {category.map((idvCtgy, idx) => (
              <option key={idx}>{idvCtgy}</option>
            ))}
          </select>
        </div>

        <div className="sideBarConditionDiv">
          <span>Condition: </span>
          <br />
          <select className="sideBarSelect">
            {condition.map((idvCndtn, idx) => (
              <option key={idx}>
                {idvCndtn[0].toUpperCase() + idvCndtn.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="sideBarPriceDiv">
          <span>Price: </span>
          <br />
          <select className="sideBarSelect">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button type="submit" className="sideBarSubmitBtn">
          Find Cars!
        </button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    allProducts: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllProducts: () => dispatch(loadAllProducts())
  }
}

export default connect(mapState, mapDispatch)(Sidebar)
