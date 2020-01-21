import React from 'react';
import {connect} from 'react-redux';
import {getAllUsers} from '../../store';

class ListOfUsers extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const allUsers = this.props.allUsers;
    return allUsers ? (
      <div>
        <h1>All Registered Users:</h1>

        <div className="user-list-cont">
          <div className="user-col">
            <h3>Name</h3>
            <h3>Email</h3>
            <h3>Admin rights</h3>
          </div>
          <div>
            {allUsers.map(user => {
              return (
                <div key={user.id} className="user-list-row">
                  <h4>{user.name}</h4>
                  <h4>{user.email}</h4>
                  <h4>{user.admin ? 'Yes' : 'No'}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {allUsers: state.allUsers};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(getAllUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfUsers);
