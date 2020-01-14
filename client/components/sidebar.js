import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Sidebar extends Component {
  componentDidMount() {
    console.log('sidebar -', this.props)
  }

  render() {
    return (
      <div className="sideBarDiv">
        <Link to="/allProducts" className="linkText">
          All Products
        </Link>

        <div className="sideBarBrandDiv">
          <span>Brand: </span>
          <select>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>

        <div className="sideBarModelDiv">
          <span>Model: </span>
          <select>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>

        <button type="submit">Find Cars!</button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(Sidebar)
