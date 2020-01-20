import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateProfileThunk} from '../store/userProfile';

class UpdateProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    if (this.state.email && this.state.name !== '') {
      this.props.updateProfile(this.props.user.id, this.state);
    }
    if (this.state.name === '' && this.state.email !== '') {
      this.props.updateProfile(this.props.user.id, {
        name: this.props.user.name,
        email: this.state.email
      });
    } else if (this.state.email === '' && this.state.name !== '') {
      this.props.updateProfile(this.props.user.id, {
        name: this.state.name,
        email: this.props.user.email
      });
    }
    this.props.history.push('/allProducts');
    window.location.reload(false);
  }

  render() {
    return (
      <div className="signInFullDiv">
        <form onSubmit={this.handleSubmit} className="profile-flex-box">
          <h2>Update Profile:</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (userId, updatedProfile) => {
      dispatch(updateProfileThunk(userId, updatedProfile));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
