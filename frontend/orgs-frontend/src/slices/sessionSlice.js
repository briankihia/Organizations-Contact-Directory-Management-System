import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    token: null, // Ensure the token field exists in the initial state
    user: null,  // Optional: Add user details if needed
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // Update the token in the state
    },
    clearSession: (state) => {
      state.token = null; // Clear the token
      state.user = null;  // Clear user details if applicable
    },
    saveSession: (state, action) => {
      const { token = null, user = null } = action.payload || {}; // Provide default values
      state.token = token; // Save the token
      state.user = user;   // Save user details
    },
    loadSession: (state, action) => {
      const { token = null, user = null } = action.payload || {}; // Provide default values
      state.token = token; // Load the token
      state.user = user;   // Load user details
    },
    logoutSession: (state) => {
      state.token = null; // Clear the token
      state.user = null;  // Clear user details
    },
  },
});

export const { setToken, clearSession, saveSession, loadSession, logoutSession } = sessionSlice.actions;
export default sessionSlice.reducer;