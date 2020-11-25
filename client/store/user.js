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

export const auth = userObj => async dispatch => {
  let res;
  try {
    const {formName} = userObj;
    if (formName === 'signup')
      res = await axios.post(`/auth/${formName}`, userObj);
    else res = await axios.post(`/auth/${formName}`, userObj);
  } catch (authError) {
    return dispatch(getUser({error: authError}));
  }

  try {
    const {user, cart, CartDetail} = res.data;
    localStorage.clear();
    dispatch(getUser(user));
    history.push('/');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    localStorage.clear();
    history.push('/signIn');
    window.location.reload(false);
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
