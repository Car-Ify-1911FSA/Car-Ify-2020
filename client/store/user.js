import axios from 'axios';
import history from '../history';

// INITIAL STATE
const defaultUser = {};

// ACTION TYPES
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// ACTION CREATORS
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

// THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method, name) => async dispatch => {
  let res;
  try {
    if (method === 'signup')
      res = await axios.post(`/auth/${method}`, {email, name, password});
    else res = await axios.post(`/auth/${method}`, {email, password});
  } catch (authError) {
    return dispatch(getUser({error: authError}));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    // localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('cart', JSON.stringify([]));
    history.push('/signIn');
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};

export default userReducer;
