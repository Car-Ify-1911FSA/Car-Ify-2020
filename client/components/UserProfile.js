import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateProfileThunk} from '../store/userProfile';

class UserProfile extends React.Component {
  render() {
    return (
      <h1>
        <div>Name: {this.props.user.name}</div>
        <div>Email: {this.props.user.email}</div>
        <div>
          <Link to={`/updateProfile/${this.props.user.id}`}>Edit Profile</Link>
        </div>
        <div>
          <Link to="/cart">Edit Cart</Link>
        </div>
      </h1>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserProfile);
