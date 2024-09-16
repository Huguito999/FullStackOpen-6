import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnecdote } from "../services/anecdotes"; 
const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      alert("Anecdote must be at least 5 characters long.");
      return;
    }

    newAnecdoteMutation.mutate({ content, votes: 0 });
    event.target.anecdote.value = "";
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
