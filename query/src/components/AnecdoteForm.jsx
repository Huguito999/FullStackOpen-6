import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnecdote } from "../services/anecdotes";
import { useNotification } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [, dispatch] = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
      dispatch({
        type: "SHOW",
        payload: `Anecdote '${newAnecdote.content}' added!`,
      });

      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 5000);
    },
    onError: (error) => {
      dispatch({
        type: "SHOW",
        payload: "Error: Anecdote must be at least 5 characters long.",
      });

      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    newAnecdoteMutation.mutate({ content, votes: 0 });
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
