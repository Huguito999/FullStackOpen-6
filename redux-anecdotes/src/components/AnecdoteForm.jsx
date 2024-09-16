import { useDispatch } from "react-redux";
import { createAnecdoteWithNotification } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const { target } = event;
    const content = target.anecdote.value;
    target.anecdote.value = "";

    dispatch(createAnecdoteWithNotification(content));
  };

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
