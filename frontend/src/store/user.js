const LOAD_USER = "user/loadUser"

const load = list => ({
  type: LOAD_USER,
  list,
});

export const getUser = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getAllUsers = () => async dispatch => {
  const response = await fetch(`/api/users/`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

const initialState = {};

const userReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case LOAD_USER: {
      const allUsers = {};
      action.list.forEach(user => {
        allUsers[user.id] = user;
      });
      return {
        ...allUsers,
        ...state
      };
    }
    default:
      return state;
  }
};

export default userReducer;
