import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  email: null,
  image: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },

    removeUser(state) {
      state.username = null;
      state.email = null;
      state.image = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const setUsername = (state) => state.user.username;
export const setEmail = (state) => state.user.email;
export const setImage = (state) => state.user.image;

export default userSlice.reducer;
