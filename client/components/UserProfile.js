import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateProfileThunk} from '../store/userProfile';

class UserProfile extends React.Component {
  componentDidMount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;
  }

  componentWillUnmount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 1;
  }

  render() {
    return (
      <div className="profile-flex-box">
        <h2 className="profileDiv">Car-ify Profile</h2>
        <div>
          <Link
            to={`/updateProfile/${this.props.user.id}`}
            className="edit-profile"
          >
            Edit Profile
          </Link>
          <Link to="/cart" className="edit-cart">
            View Cart
          </Link>
          <Link
            to={`/OrderHistory/${this.props.user.id}`}
            className="edit-cart"
          >
            View Order History
          </Link>
        </div>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserProfile);
