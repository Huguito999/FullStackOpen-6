import { configureStore } from "@reduxjs/toolkit";
import anecdotes from "./services/anecdotes"
import filterReducer from "./reducers/filterReducer";
import anecdoteReducer, { appendAnecdote, setAnecdotes } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});
anecdotes.getAll().then(anecdotes =>
  store.dispatch(setAnecdotes(anecdotes))
  )
export default store;
