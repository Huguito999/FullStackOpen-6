import { useDispatch, useSelector } from "react-redux";
import { voteAnecdoteWithNotification } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(
      (anecdote) =>
        typeof anecdote.content === "string" &&
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const dispatch = useDispatch();

  const handlevote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdoteWithNotification(id));
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
