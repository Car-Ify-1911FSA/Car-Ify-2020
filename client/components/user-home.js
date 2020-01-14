import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isLoggedIn} = props

  return (
    <div className="homePageDiv">
      {isLoggedIn ? (
        <h3>Welcome, {email}</h3>
      ) : (
        <h3>Welcome Guest! Remember to login or sign-up!</h3>
      )}
      <div className="homePagePara">
        <p>Welcome to Car-Ify! Where your car shopping dreams can come true!</p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
