import { useState } from 'react';
import "./App.css";

const Header = ({ text }) => {
  return (
    <h2>{text}</h2>
  );
};

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const Anecdote = ({ anecdote }) => {
  return (
    <p>{anecdote}</p>
  );
};

const VoteStat = ({ votes }) => {
  return (
    <p>has {votes} votes</p>
  );
};

const AnecdoteDisplay = ({ anecdote,  votes }) => {
  if (!anecdote) {
    return <p>No anecdote yet</p>;
  } 

  return (
    <div>
      <Anecdote anecdote={anecdote} />
      <VoteStat votes={votes} />
    </div>
  );
}; 


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const pickRandomAnecdote = () => {
    const i = Math.floor(Math.random() * anecdotes.length);
    setSelected(i);
  };
  
  const getCurrentVotes = () => {
    return votes[selected] || 0;
  };

  const addVote = () => {
    const votesCopy = { ...votes };
    votesCopy[selected] = getCurrentVotes() + 1;
    setVotes(votesCopy);
  };

  const getMostVotedAnecdote = () => {
    let mostVoted = { 
      index: null,
      votes: null, 
    };

    for (let anecdoteIndex in votes) {
      if (votes[anecdoteIndex] > mostVoted.votes) {
        mostVoted.index = parseInt(anecdoteIndex);
        mostVoted.votes = votes[anecdoteIndex];
      };
    };

    return mostVoted;
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <AnecdoteDisplay 
        anecdote={anecdotes[selected]} 
        votes={getCurrentVotes()}
      />
      <Button text="vote" onClick={addVote}/>
      <Button text="next anecdote" onClick={pickRandomAnecdote} />
      <Header text="Anecdote with most votes" />
      <AnecdoteDisplay 
        anecdote={anecdotes[getMostVotedAnecdote().index]} 
        votes={getMostVotedAnecdote().votes} 
      />
    </div>
  );
};

export default App;