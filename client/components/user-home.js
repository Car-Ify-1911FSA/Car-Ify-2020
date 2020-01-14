import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class UserHome extends Component {
  render() {
    const {email, isLoggedIn} = this.props

    return (
      <div className="homePageDiv">
        {isLoggedIn ? (
          <h3>
            Welcome back, <span className="hpLoggedInWelcome">{email}!</span>
          </h3>
        ) : (
          <h3>Welcome Guest! Remember to login or sign-up!</h3>
        )}

        <div className="homePagePara">
          <p>
            Welcome to Car-Ify! Where your car shopping dreams can come true!
          </p>
        </div>

        {isLoggedIn ? (
          <div>
            <span>Recent Purchases: </span>
          </div>
        ) : (
          <div />
        )}

        <div className="homePageTop">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtjZMMofBIsAi4F2ESDUwjtcLz72t6O0C_FcajyCSm8LWQg5X8" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpaOexXQpRpu85_Xz8xHnJOL6nycw-pZZ1bezgK1Fp8VptDdBk" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTY_jTD1wj-EqDLJ3rD534a5cRNR4atMrzQrp__ytKIT0IrNaW" />
        </div>
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
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string
}
