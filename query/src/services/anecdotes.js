import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${anecdote.id}`,
    { ...anecdote, votes: anecdote.votes + 1 }
  );
  return response.data;
};

export { getAnecdotes, addAnecdote, updateAnecdote };
