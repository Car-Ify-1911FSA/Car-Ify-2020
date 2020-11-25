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

  componentDidMount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;
  }

  componentWillUnmount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 1;
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
      <div>
        <form onSubmit={this.handleSubmit} className="update-profile-div">
          <h2 className="updateTitle">Update Profile</h2>
          <div className="update-name-div">Name</div>
          <label className="update-name">
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <div className="update-email-div">Email</div>
          <label className="update-email">
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <button type="submit" className="updateSubmit">
            Submit
          </button>
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
