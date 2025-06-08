import { useState } from "react";
import "./App.css"

const Header = ({ headerText }) => {
  return <h2>{headerText}</h2>;
};

const StatItem = ({ text, value }) => {
  return <div className="stat-item">{text} {value}</div>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header headerText="give feedback" />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Header headerText="statistics" />
      <StatItem text="good" value={good} />
      <StatItem text="neutral" value={neutral} />
      <StatItem text="bad" value={bad} />
    </div>
  );
};

export default App;
