import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Sidebar = () => (
  <div className="sideBarDiv">
    <Link to="/allProducts">All Products! [BUILD]</Link>

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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(Sidebar)
