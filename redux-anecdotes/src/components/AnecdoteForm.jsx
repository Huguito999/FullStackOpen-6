import { useDispatch } from "react-redux";
import { createAnecdoteWithNotification } from "../reducers/anecdoteReducer";
import anecdotes from "../services/anecdotes";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const { target } = event;
    const content = target.anecdote.value;
    target.anecdote.value = "";
    const newAnecdote= await anecdotes.createNew(content)
    dispatch(createAnecdoteWithNotification(newAnecdote))
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
