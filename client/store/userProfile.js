import axios from 'axios';

// ACTION TYPES
const UPDATE_PROFILE = 'UPDATE_PROFILE';

// ACTION CREATORS
const updateProfile = updatedProfile => {
  return {
    type: UPDATE_PROFILE,
    updatedProfile
  };
};

// THUNKY THUNKS
export const updateProfileThunk = (userId, updatedProfile) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, updatedProfile);
      console.log(data);
      dispatch(updateProfile(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const userProfileReducer = (userProfileState = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return action.updatedProfile;
    default:
      return userProfileState;
  }
};

export default userProfileReducer;
