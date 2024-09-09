import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "This is the initial notification message",
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => "",
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration);
  };
};

export default notificationSlice.reducer;
