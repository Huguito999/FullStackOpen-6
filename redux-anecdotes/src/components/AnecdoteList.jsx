import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter ? state.filter.toLowerCase() : '';  // Asegurarse de que el filtro no sea undefined
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter)
      )
      .sort((a, b) => b.votes - a.votes);
  });
  
  const dispatch = useDispatch();

  const handlevote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handlevote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
