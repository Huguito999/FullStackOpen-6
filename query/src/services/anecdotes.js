import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    throw new Error('Anecdote content must be at least 5 characters long');
  }
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};
export { getAnecdotes, addAnecdote, updateAnecdote };
