import React from 'react';
import {connect} from 'react-redux';
import ListOfUsers from './ListOfUsers';
import ListOfAllProducts from './ListOfAllProducts';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: false,
      productList: false
    };
    this.handleProductsClick = this.handleProductsClick.bind(this);
    this.handleUsersClick = this.handleUsersClick.bind(this);
  }

  componentDidMount() {}

  handleUsersClick() {
    this.setState({productList: false, userList: !this.state.userList});
  }

  handleProductsClick() {
    this.setState({productList: !this.state.productList, userList: false});
  }

  render() {
    return (
      <div>
        <h2>Shhhhhh... Administrator {this.props.name} is working!</h2>
        <div>
          <button type="button" onClick={this.handleUsersClick}>
            Users
          </button>
          <button type="button" onClick={this.handleProductsClick}>
            Products
          </button>
        </div>
        {this.state.userList ? <ListOfUsers /> : null}
        {this.state.productList ? <ListOfAllProducts /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name
  };
};

export default connect(mapStateToProps)(AdminHome);
