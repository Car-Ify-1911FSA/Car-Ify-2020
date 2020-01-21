import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';

const gotAllUsers = allUsers => {
  return {
    type: GET_ALL_USERS,
    allUsers
  };
};

//Thunky thunk
export const getAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users');
      dispatch(gotAllUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers;
    default:
      return state;
  }
};

export default allUsersReducer;
