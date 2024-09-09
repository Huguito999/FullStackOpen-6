import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notificationReducer";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions;

export const voteAnecdoteWithNotification = (id) => {
  return (dispatch, getState) => {
    dispatch(voteAnecdote(id));

    const anecdote = getState().anecdotes.find(
      (anecdote) => anecdote.id === id
    );
    dispatch(showNotification(`You voted for "${anecdote.content}"`, 5000));
  };
};

export const createAnecdoteWithNotification = (content) => {
  return (dispatch) => {
    const newAnecdote = {
      content,
      id: (Math.random() * 10000).toFixed(0),
      votes: 0,
    };
    dispatch(createAnecdote(newAnecdote));
    dispatch(showNotification(`You created "${content}"`, 5000));
  };
};

export default anecdoteSlice.reducer;
