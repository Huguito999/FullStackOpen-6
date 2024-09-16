import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";
import { showNotification } from "./notificationReducer";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteAnecdoteWithNotification = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find((anecdote) => anecdote.id === id);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

    try {
      const returnedAnecdote = await anecdotesService.update(updatedAnecdote);
      dispatch(updateAnecdote(returnedAnecdote));
      dispatch(showNotification(`You voted for "${returnedAnecdote.content}"`, 5000));
    } catch (error) {
      console.error('Error updating anecdote:', error);
      dispatch(showNotification('Failed to vote', 5000));
    }
  };
};

export const createAnecdoteWithNotification = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    const anecdoteContent = newAnecdote.content.content || newAnecdote.content;
    dispatch(appendAnecdote({ ...newAnecdote, content: anecdoteContent }));
    dispatch(showNotification(`You created "${anecdoteContent}"`, 5000));
  };
};

export default anecdoteSlice.reducer;
